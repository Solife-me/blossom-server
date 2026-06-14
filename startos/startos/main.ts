import { buildBlossomConfig } from "./blossom-config";
import { blossomConfigYaml } from "./fileModels/blossom-config.yaml";
import { credentialsJson } from "./fileModels/credentials.json";
import { settingsDefaults, settingsYaml } from "./fileModels/settings.yaml";
import { i18n } from "./i18n";
import { sdk } from "./sdk";
import { uiPort } from "./utils";

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n("Starting Blossom Server"));

  const settings = (await settingsYaml.read().const(effects)) ??
    settingsDefaults;
  const generatedPassword = (await credentialsJson
    .read((value) => value.dashboardGeneratedPassword)
    .const(effects)) ?? "";

  await blossomConfigYaml.write(
    effects,
    buildBlossomConfig(settings, generatedPassword),
    { allowWriteAfterConst: true },
  );

  return sdk.Daemons.of(effects).addDaemon("primary", {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: "main" },
      sdk.Mounts.of().mountVolume({
        volumeId: "main",
        subpath: null,
        mountpoint: "/data",
        readonly: false,
      }),
      "blossom-server",
    ),
    exec: {
      command: ["/usr/local/bin/docker_entrypoint.sh"],
      sigtermTimeout: 30000,
    },
    ready: {
      display: i18n("Web UI"),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n("Blossom Server is listening"),
          errorMessage: i18n("Blossom Server is not listening"),
        }),
      gracePeriod: 30000,
    },
    requires: [],
  });
});
