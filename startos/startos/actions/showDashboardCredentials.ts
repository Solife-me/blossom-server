import { randomPassword } from "../blossom-config";
import { credentialsJson } from "../fileModels/credentials.json";
import { settingsDefaults, settingsYaml } from "../fileModels/settings.yaml";
import { i18n } from "../i18n";
import { sdk } from "../sdk";

export const showDashboardCredentials = sdk.Action.withoutInput(
  "show-dashboard-credentials",
  {
    name: i18n("Show Dashboard Credentials"),
    description: i18n("Display the current admin dashboard login details."),
    warning: null,
    allowedStatuses: "any",
    group: null,
    visibility: "enabled",
  },
  async ({ effects }) => {
    const settings = (await settingsYaml.read().once()) ?? settingsDefaults;

    if (!settings.dashboard.enabled) {
      return {
        version: "1",
        title: i18n("Dashboard Disabled"),
        message: i18n("The admin dashboard is currently disabled."),
        result: null,
      };
    }

    const explicitPassword = settings.dashboard.password.trim();
    let generatedPassword = (await credentialsJson
      .read((value) => value.dashboardGeneratedPassword)
      .once()) ?? "";

    if (!explicitPassword && !generatedPassword) {
      generatedPassword = randomPassword();
      await credentialsJson.merge(effects, {
        dashboardGeneratedPassword: generatedPassword,
      });
    }

    return {
      version: "1",
      title: i18n("Dashboard Credentials"),
      message: i18n("Use these credentials at /admin."),
      result: {
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
      },
    };
  },
);
