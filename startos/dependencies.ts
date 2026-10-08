import { sdk } from "./sdk";

export const setDependencies = sdk.setupDependencies(() => Promise.resolve({}));
