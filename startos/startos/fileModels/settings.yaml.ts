import { FileHelper, z } from "@start9labs/start-sdk";
import { sdk } from "../sdk";

export const DEFAULT_STORAGE_RULES = [
  { type: "image/*", expiration: "1 month", pubkeys: [] },
  { type: "video/*", expiration: "1 week", pubkeys: [] },
  { type: "*", expiration: "1 week", pubkeys: [] },
];

const storageRuleShape = z.object({
  type: z.string().catch("*"),
  expiration: z.string().catch("1 week"),
  pubkeys: z.array(z.string()).catch([]),
});

export const settingsDefaults = {
  network: {
    "public-domain": "",
  },
  storage: {
    "remove-when-no-owners": false,
    rules: DEFAULT_STORAGE_RULES,
  },
  upload: {
    enabled: true,
    "require-auth": true,
    "max-size-mib": 2048,
    workers: 0,
    "require-pubkey-in-rule": false,
  },
  mirror: {
    enabled: true,
    "require-auth": true,
    "connect-timeout-ms": 30000,
    "body-timeout-ms": 0,
  },
  list: {
    enabled: false,
    "require-auth": false,
    "allow-list-others": true,
  },
  media: {
    enabled: false,
    "require-auth": true,
    "max-size-mib": 1024,
  },
  landing: {
    enabled: true,
    title: "Blossom Server",
  },
  dashboard: {
    enabled: false,
    username: "admin",
    password: "",
  },
  report: {
    enabled: true,
  },
  prune: {
    "initial-delay-seconds": 60,
    "interval-seconds": 30,
  },
};

export const settingsShape = z.object({
  network: z
    .object({
      "public-domain": z
        .string()
        .catch(settingsDefaults.network["public-domain"]),
    })
    .catch(settingsDefaults.network),
  storage: z
    .object({
      "remove-when-no-owners": z
        .boolean()
        .catch(settingsDefaults.storage["remove-when-no-owners"]),
      rules: z.array(storageRuleShape).catch(settingsDefaults.storage.rules),
    })
    .catch(settingsDefaults.storage),
  upload: z
    .object({
      enabled: z.boolean().catch(settingsDefaults.upload.enabled),
      "require-auth": z
        .boolean()
        .catch(settingsDefaults.upload["require-auth"]),
      "max-size-mib": z
        .number()
        .int()
        .positive()
        .catch(settingsDefaults.upload["max-size-mib"]),
      workers: z.number().int().min(0).catch(settingsDefaults.upload.workers),
      "require-pubkey-in-rule": z
        .boolean()
        .catch(settingsDefaults.upload["require-pubkey-in-rule"]),
    })
    .catch(settingsDefaults.upload),
  mirror: z
    .object({
      enabled: z.boolean().catch(settingsDefaults.mirror.enabled),
      "require-auth": z
        .boolean()
        .catch(settingsDefaults.mirror["require-auth"]),
      "connect-timeout-ms": z
        .number()
        .int()
        .min(0)
        .catch(settingsDefaults.mirror["connect-timeout-ms"]),
      "body-timeout-ms": z
        .number()
        .int()
        .min(0)
        .catch(settingsDefaults.mirror["body-timeout-ms"]),
    })
    .catch(settingsDefaults.mirror),
  list: z
    .object({
      enabled: z.boolean().catch(settingsDefaults.list.enabled),
      "require-auth": z.boolean().catch(settingsDefaults.list["require-auth"]),
      "allow-list-others": z
        .boolean()
        .catch(settingsDefaults.list["allow-list-others"]),
    })
    .catch(settingsDefaults.list),
  media: z
    .object({
      enabled: z.boolean().catch(settingsDefaults.media.enabled),
      "require-auth": z.boolean().catch(settingsDefaults.media["require-auth"]),
      "max-size-mib": z
        .number()
        .int()
        .positive()
        .catch(settingsDefaults.media["max-size-mib"]),
    })
    .catch(settingsDefaults.media),
  landing: z
    .object({
      enabled: z.boolean().catch(settingsDefaults.landing.enabled),
      title: z.string().catch(settingsDefaults.landing.title),
    })
    .catch(settingsDefaults.landing),
  dashboard: z
    .object({
      enabled: z.boolean().catch(settingsDefaults.dashboard.enabled),
      username: z.string().catch(settingsDefaults.dashboard.username),
      password: z.string().catch(settingsDefaults.dashboard.password),
    })
    .catch(settingsDefaults.dashboard),
  report: z
    .object({
      enabled: z.boolean().catch(settingsDefaults.report.enabled),
    })
    .catch(settingsDefaults.report),
  prune: z
    .object({
      "initial-delay-seconds": z
        .number()
        .int()
        .positive()
        .catch(settingsDefaults.prune["initial-delay-seconds"]),
      "interval-seconds": z
        .number()
        .int()
        .positive()
        .catch(settingsDefaults.prune["interval-seconds"]),
    })
    .catch(settingsDefaults.prune),
});

export type StartOSSettings = z.infer<typeof settingsShape>;
export type StartOSStorageRule = StartOSSettings["storage"]["rules"][number];

export const settingsYaml = FileHelper.yaml(
  { base: sdk.volumes.main, subpath: "start9/settings.yaml" },
  settingsShape,
);
