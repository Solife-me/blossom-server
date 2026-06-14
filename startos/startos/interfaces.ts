import { i18n } from "./i18n";
import { sdk } from "./sdk";
import { uiPort } from "./utils";

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const multi = sdk.MultiHost.of(effects, "web");
  const origin = await multi.bindPort(uiPort, {
    protocol: "http",
    preferredExternalPort: 80,
  });

  const landing = sdk.createInterface(effects, {
    name: i18n("Landing Page"),
    id: "ui",
    description: i18n("The Blossom landing page and HTTP API."),
    type: "ui",
    masked: false,
    schemeOverride: null,
    username: null,
    path: "",
    query: {},
  });

  const admin = sdk.createInterface(effects, {
    name: i18n("Admin Dashboard"),
    id: "admin",
    description: i18n("The Blossom admin dashboard."),
    type: "ui",
    masked: false,
    schemeOverride: null,
    username: "admin",
    path: "/admin",
    query: {},
  });

  return [await origin.export([landing, admin])];
});
