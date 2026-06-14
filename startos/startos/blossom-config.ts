import type {
  StartOSSettings,
  StartOSStorageRule,
} from "./fileModels/settings.yaml";

const PASSWORD_ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function booleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function nonNegativeIntegerOrDefault(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0
    ? value
    : fallback;
}

function positiveIntegerOrDefault(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isInteger(value) && value > 0
    ? value
    : fallback;
}

function bytesFromMiB(value: unknown, fallbackMiB: number): number {
  return positiveIntegerOrDefault(value, fallbackMiB) * 1024 * 1024;
}

function cleanRule(rule: StartOSStorageRule): Record<string, unknown> {
  const type = asString(rule.type) || "*";
  const expiration = asString(rule.expiration) || "1 week";
  const pubkeys = Array.isArray(rule.pubkeys)
    ? rule.pubkeys.map((pubkey) => asString(pubkey)).filter(Boolean)
    : [];

  return pubkeys.length > 0
    ? { type, expiration, pubkeys }
    : { type, expiration };
}

export function randomPassword(length = 20): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(
    bytes,
    (byte) => PASSWORD_ALPHABET[byte % PASSWORD_ALPHABET.length],
  ).join("");
}

export function buildBlossomConfig(
  settings: StartOSSettings,
  dashboardGeneratedPassword?: string,
): Record<string, unknown> {
  const dashboardEnabled = booleanOrDefault(settings.dashboard.enabled, false);
  const dashboardPassword = asString(settings.dashboard.password) ||
    asString(dashboardGeneratedPassword);

  return {
    publicDomain: asString(settings.network["public-domain"]),
    host: "0.0.0.0",
    port: 3000,
    database: {
      path: "/data/sqlite.db",
    },
    storage: {
      backend: "local",
      local: {
        dir: "/data/blobs",
      },
      rules: settings.storage.rules.map((rule) => cleanRule(rule)),
      removeWhenNoOwners: booleanOrDefault(
        settings.storage["remove-when-no-owners"],
        false,
      ),
    },
    upload: {
      enabled: booleanOrDefault(settings.upload.enabled, true),
      requireAuth: booleanOrDefault(settings.upload["require-auth"], true),
      maxSize: bytesFromMiB(settings.upload["max-size-mib"], 2048),
      workers: nonNegativeIntegerOrDefault(settings.upload.workers, 0),
      maxJobsPerWorker: 4,
      throughputWindowMs: 1000,
      requirePubkeyInRule: booleanOrDefault(
        settings.upload["require-pubkey-in-rule"],
        false,
      ),
    },
    mirror: {
      enabled: booleanOrDefault(settings.mirror.enabled, true),
      requireAuth: booleanOrDefault(settings.mirror["require-auth"], true),
      connectTimeout: nonNegativeIntegerOrDefault(
        settings.mirror["connect-timeout-ms"],
        30000,
      ),
      bodyTimeout: nonNegativeIntegerOrDefault(
        settings.mirror["body-timeout-ms"],
        0,
      ),
    },
    delete: {
      requireAuth: true,
    },
    list: {
      enabled: booleanOrDefault(settings.list.enabled, false),
      requireAuth: booleanOrDefault(settings.list["require-auth"], false),
      allowListOthers: booleanOrDefault(
        settings.list["allow-list-others"],
        true,
      ),
    },
    media: {
      enabled: booleanOrDefault(settings.media.enabled, false),
      requireAuth: booleanOrDefault(settings.media["require-auth"], true),
      maxSize: bytesFromMiB(settings.media["max-size-mib"], 1024),
    },
    landing: {
      enabled: booleanOrDefault(settings.landing.enabled, true),
      title: asString(settings.landing.title) || "Blossom Server",
    },
    dashboard: dashboardEnabled
      ? {
        enabled: true,
        username: asString(settings.dashboard.username) || "admin",
        password: dashboardPassword,
      }
      : {
        enabled: false,
      },
    report: {
      enabled: booleanOrDefault(settings.report.enabled, true),
    },
    prune: {
      initialDelayMs:
        positiveIntegerOrDefault(settings.prune["initial-delay-seconds"], 60) *
        1000,
      intervalMs:
        positiveIntegerOrDefault(settings.prune["interval-seconds"], 30) * 1000,
    },
  };
}
