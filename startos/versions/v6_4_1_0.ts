import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v6_4_1_0 = VersionInfo.of({
  version: '6.4.1:0',
  releaseNotes: {
    en_US:
      'Updates Blossom Server to 6.4.1 with hardened uploads and media handling, mirror SSRF protection, safer active-content delivery, incremental pruning, identity improvements, and reliability fixes.',
    es_ES:
      'Actualiza Blossom Server a 6.4.1 con cargas y medios reforzados, proteccion SSRF para espejos, entrega mas segura de contenido activo, poda incremental y mejoras de fiabilidad.',
    de_DE:
      'Aktualisiert Blossom Server auf 6.4.1 mit gehaerteten Uploads, SSRF-Schutz fuer Spiegel, sichererer Auslieferung aktiver Inhalte, inkrementeller Bereinigung und Zuverlaessigkeitskorrekturen.',
    pl_PL:
      'Aktualizuje Blossom Server do 6.4.1 ze wzmocniona obsluga przesylania i mediow, ochrona SSRF dla lustrzanych pobran, bezpieczniejsza obsluga aktywnej tresci i poprawkami niezawodnosci.',
    fr_FR:
      'Met a jour Blossom Server vers 6.4.1 avec des televersements renforces, une protection SSRF pour les miroirs, une diffusion plus sure du contenu actif, un elagage incremental et des correctifs de fiabilite.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
