import { FileHelper, z } from "@start9labs/start-sdk";
import { sdk } from "../sdk";

export const blossomConfigYaml = FileHelper.yaml(
  { base: sdk.volumes.main, subpath: "start9/blossom-config.yml" },
  z.record(z.string(), z.unknown()),
);
