import { IMPOSSIBLE, VersionInfo } from "@start9labs/start-sdk";

export const current = VersionInfo.of({
  version: "6.0.1:2",
  releaseNotes: {
    en_US:
      "Rebuilt StartOS 0.4 beta package for Blossom Server 6.0.1 with latest upstream changes.",
    es_ES:
      "Paquete StartOS 0.4 beta reconstruido para Blossom Server 6.0.1 con los ultimos cambios upstream.",
    de_DE:
      "Neu gebautes StartOS 0.4 Beta-Paket fuer Blossom Server 6.0.1 mit den neuesten Upstream-Aenderungen.",
    pl_PL:
      "Przebudowany pakiet StartOS 0.4 beta dla Blossom Server 6.0.1 z najnowszymi zmianami upstream.",
    fr_FR:
      "Paquet StartOS 0.4 beta reconstruit pour Blossom Server 6.0.1 avec les derniers changements upstream.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
});
