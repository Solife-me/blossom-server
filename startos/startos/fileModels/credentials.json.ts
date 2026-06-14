import { FileHelper, z } from "@start9labs/start-sdk";
import { sdk } from "../sdk";

export const credentialsShape = z.object({
  dashboardGeneratedPassword: z.string().catch(""),
});

export type Credentials = z.infer<typeof credentialsShape>;

export const credentialsJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: "start9/credentials.json" },
  credentialsShape,
);
