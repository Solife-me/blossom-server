import { sdk } from "../sdk";
import { configure } from "./configure";
import { showDashboardCredentials } from "./showDashboardCredentials";

export const actions = sdk.Actions.of()
  .addAction(configure)
  .addAction(showDashboardCredentials);
