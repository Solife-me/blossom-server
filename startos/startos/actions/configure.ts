import { buildBlossomConfig, randomPassword } from "../blossom-config";
import { credentialsJson } from "../fileModels/credentials.json";
import { blossomConfigYaml } from "../fileModels/blossom-config.yaml";
import {
  settingsDefaults,
  settingsShape,
  settingsYaml,
} from "../fileModels/settings.yaml";
import { i18n } from "../i18n";
import { sdk } from "../sdk";

const { InputSpec, List, Value } = sdk;

const pubkeyPattern = {
  regex: "^[0-9a-fA-F]{64}$",
  description: i18n("64-character hex pubkey"),
};

const storageRuleSpec = InputSpec.of({
  type: Value.text({
    name: i18n("MIME Pattern"),
    description: i18n("Examples: image/*, video/*, application/json, or *."),
    required: true,
    default: "*",
    placeholder: "image/*",
  }),
  expiration: Value.text({
    name: i18n("Expiration"),
    description: i18n(
      "Human-readable retention duration such as 7 days, 1 week, or 1 month.",
    ),
    required: true,
    default: "1 week",
    placeholder: "1 week",
  }),
  pubkeys: Value.list(
    List.text(
      {
        name: i18n("Pubkeys"),
        description: i18n(
          "Optional uploader pubkeys this rule applies to. Leave empty to match any pubkey.",
        ),
        default: [],
      },
      {
        placeholder: i18n("64-character hex pubkey"),
        patterns: [pubkeyPattern],
      },
    ),
  ),
});

export const settingsInputSpec = InputSpec.of({
  network: Value.object(
    {
      name: i18n("Network"),
    },
    InputSpec.of({
      "public-domain": Value.text({
        name: i18n("Public Domain Override"),
        description: i18n(
          "Optional bare hostname used for generated blob URLs and BUD-11 server tag validation.",
        ),
        required: true,
        default: "",
        placeholder: "blobs.example.com",
        patterns: [
          {
            regex: "^$|^[A-Za-z0-9.-]+$",
            description: "Must be blank or a bare hostname",
          },
        ],
      }),
    }),
  ),
  storage: Value.object(
    {
      name: i18n("Storage"),
    },
    InputSpec.of({
      "remove-when-no-owners": Value.toggle({
        name: i18n("Delete Unowned Blobs"),
        description: i18n("Delete blobs with no owners during prune cycles."),
        default: settingsDefaults.storage["remove-when-no-owners"],
      }),
      rules: Value.list(
        List.obj(
          {
            name: i18n("Storage Rules"),
            description: i18n(
              "Ordered retention rules. The first matching rule wins. Leave empty to accept any MIME type with no expiry.",
            ),
          },
          {
            spec: storageRuleSpec,
            displayAs: "{{type}} - {{expiration}}",
            uniqueBy: null,
          },
        ),
      ),
    }),
  ),
  upload: Value.object(
    {
      name: i18n("Upload"),
    },
    InputSpec.of({
      enabled: Value.toggle({
        name: i18n("Enable Upload"),
        description: i18n("Enable the PUT /upload endpoint."),
        default: settingsDefaults.upload.enabled,
      }),
      "require-auth": Value.toggle({
        name: i18n("Require Auth"),
        description: i18n("Require a BUD-11 Nostr auth event."),
        default: settingsDefaults.upload["require-auth"],
      }),
      "max-size-mib": Value.number({
        name: i18n("Max Upload Size"),
        description: i18n("Maximum upload size in mebibytes."),
        required: true,
        default: settingsDefaults.upload["max-size-mib"],
        min: 1,
        max: 65536,
        integer: true,
        units: "MiB",
      }),
      workers: Value.number({
        name: i18n("Upload Workers"),
        description: i18n(
          "Number of upload worker threads. Set to 0 to use one worker per CPU core.",
        ),
        required: true,
        default: settingsDefaults.upload.workers,
        min: 0,
        max: 128,
        integer: true,
      }),
      "require-pubkey-in-rule": Value.toggle({
        name: i18n("Require Pubkey Match"),
        description: i18n(
          "Reject uploads unless the uploader pubkey appears in at least one storage rule.",
        ),
        default: settingsDefaults.upload["require-pubkey-in-rule"],
      }),
    }),
  ),
  mirror: Value.object(
    {
      name: i18n("Mirror"),
    },
    InputSpec.of({
      enabled: Value.toggle({
        name: i18n("Enable Mirror"),
        description: i18n("Enable the PUT /mirror endpoint."),
        default: settingsDefaults.mirror.enabled,
      }),
      "require-auth": Value.toggle({
        name: i18n("Require Auth"),
        description: i18n("Require a BUD-11 Nostr auth event."),
        default: settingsDefaults.mirror["require-auth"],
      }),
      "connect-timeout-ms": Value.number({
        name: i18n("Connect Timeout"),
        description: i18n(
          "Timeout in milliseconds to connect to the origin and receive response headers. Set to 0 for no timeout.",
        ),
        required: true,
        default: settingsDefaults.mirror["connect-timeout-ms"],
        min: 0,
        max: 3600000,
        integer: true,
        units: "ms",
      }),
      "body-timeout-ms": Value.number({
        name: i18n("Body Timeout"),
        description: i18n(
          "Timeout in milliseconds for the full origin body transfer. Set to 0 for no timeout.",
        ),
        required: true,
        default: settingsDefaults.mirror["body-timeout-ms"],
        min: 0,
        max: 3600000,
        integer: true,
        units: "ms",
      }),
    }),
  ),
  list: Value.object(
    {
      name: i18n("List"),
    },
    InputSpec.of({
      enabled: Value.toggle({
        name: i18n("Enable List"),
        description: i18n("Enable the optional GET /list/:pubkey endpoint."),
        default: settingsDefaults.list.enabled,
      }),
      "require-auth": Value.toggle({
        name: i18n("Require Auth"),
        description: i18n("Require a BUD-11 Nostr auth event."),
        default: settingsDefaults.list["require-auth"],
      }),
      "allow-list-others": Value.toggle({
        name: i18n("Allow Listing Others"),
        description: i18n(
          "Allow an authenticated user to list blobs for a different pubkey.",
        ),
        default: settingsDefaults.list["allow-list-others"],
      }),
    }),
  ),
  media: Value.object(
    {
      name: i18n("Media"),
    },
    InputSpec.of({
      enabled: Value.toggle({
        name: i18n("Enable Media"),
        description: i18n("Enable the PUT /media endpoint."),
        default: settingsDefaults.media.enabled,
      }),
      "require-auth": Value.toggle({
        name: i18n("Require Auth"),
        description: i18n("Require a BUD-11 Nostr auth event."),
        default: settingsDefaults.media["require-auth"],
      }),
      "max-size-mib": Value.number({
        name: i18n("Max Media Size"),
        description: i18n("Maximum media upload size in mebibytes."),
        required: true,
        default: settingsDefaults.media["max-size-mib"],
        min: 1,
        max: 65536,
        integer: true,
        units: "MiB",
      }),
    }),
  ),
  landing: Value.object(
    {
      name: i18n("Landing"),
    },
    InputSpec.of({
      enabled: Value.toggle({
        name: i18n("Enable Landing Page"),
        description: i18n("Enable the server-rendered landing page."),
        default: settingsDefaults.landing.enabled,
      }),
      title: Value.text({
        name: i18n("Landing Title"),
        description: i18n("Page title displayed on the landing page."),
        required: true,
        default: settingsDefaults.landing.title,
        placeholder: "Blossom Server",
      }),
    }),
  ),
  dashboard: Value.object(
    {
      name: i18n("Dashboard"),
    },
    InputSpec.of({
      enabled: Value.toggle({
        name: i18n("Enable Dashboard"),
        description: i18n(
          "Enable the /admin dashboard protected by HTTP Basic Auth.",
        ),
        default: settingsDefaults.dashboard.enabled,
      }),
      username: Value.text({
        name: i18n("Dashboard Username"),
        description: i18n("HTTP Basic Auth username for the dashboard."),
        required: true,
        default: settingsDefaults.dashboard.username,
        placeholder: "admin",
      }),
      password: Value.text({
        name: i18n("Dashboard Password"),
        description: i18n(
          "Leave blank to let StartOS generate and persist a password.",
        ),
        required: true,
        default: settingsDefaults.dashboard.password,
        masked: true,
        placeholder: "Generated if blank",
      }),
    }),
  ),
  report: Value.object(
    {
      name: i18n("Reports"),
    },
    InputSpec.of({
      enabled: Value.toggle({
        name: i18n("Enable Reports"),
        description: i18n("Enable the BUD-09 report endpoint."),
        default: settingsDefaults.report.enabled,
      }),
    }),
  ),
  prune: Value.object(
    {
      name: i18n("Prune Loop"),
    },
    InputSpec.of({
      "initial-delay-seconds": Value.number({
        name: i18n("Initial Delay"),
        description: i18n(
          "Delay in seconds before the first prune run after startup.",
        ),
        required: true,
        default: settingsDefaults.prune["initial-delay-seconds"],
        min: 1,
        max: 86400,
        integer: true,
        units: "seconds",
      }),
      "interval-seconds": Value.number({
        name: i18n("Interval"),
        description: i18n("Minimum number of seconds between prune runs."),
        required: true,
        default: settingsDefaults.prune["interval-seconds"],
        min: 1,
        max: 86400,
        integer: true,
        units: "seconds",
      }),
    }),
  ),
});

export const configure = sdk.Action.withInput(
  "configure",
  {
    name: i18n("Configure Blossom Server"),
    description: i18n(
      "Update upload, retention, endpoint, landing page, and dashboard settings.",
    ),
    warning: null,
    allowedStatuses: "any",
    group: null,
    visibility: "enabled",
  },
  settingsInputSpec,
  async () => (await settingsYaml.read().once()) ?? settingsDefaults,
  async ({ effects, input }) => {
    const settings = settingsShape.parse(input);
    const currentGenerated = (await credentialsJson
      .read((value) => value.dashboardGeneratedPassword)
      .once()) ?? "";
    const explicitPassword = settings.dashboard.password.trim();
    const generatedPassword = settings.dashboard.enabled && !explicitPassword
      ? currentGenerated || randomPassword()
      : "";

    await credentialsJson.merge(effects, {
      dashboardGeneratedPassword: generatedPassword,
    });
    await settingsYaml.write(effects, settings);
    await blossomConfigYaml.write(
      effects,
      buildBlossomConfig(settings, generatedPassword),
    );

    return {
      version: "1",
      title: i18n("Configuration Saved"),
      message: i18n("Blossom Server will restart with the updated settings."),
      result: settings.dashboard.enabled
        ? {
          type: "group",
          value: [
            {
              type: "single",
              name: i18n("Username"),
              description: null,
              value: settings.dashboard.username,
              masked: false,
              copyable: true,
              qr: false,
            },
            {
              type: "single",
              name: i18n("Password"),
              description: null,
              value: explicitPassword || generatedPassword,
              masked: true,
              copyable: true,
              qr: false,
            },
          ],
        }
        : null,
    };
  },
);
