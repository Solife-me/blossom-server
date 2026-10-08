import { credentialsJson } from "../fileModels/credentials.json";
import { settingsYaml } from "../fileModels/settings.yaml";
import { sdk } from "../sdk";

export const seedSettings = sdk.setupOnInit(async (effects) => {
  await settingsYaml.merge(effects, {});
  await credentialsJson.merge(effects, {});
});
