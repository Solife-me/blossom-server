import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v6_2_1_0 = VersionInfo.of({
  version: '6.2.1:0',
  releaseNotes: {
    en_US:
      'Updates Blossom Server to 6.2.1 with reliable large deduplicated re-uploads, NIP-94 metadata, and media thumbnails, repackaged for StartOS with SDK 2.0.',
    es_ES:
      'Actualiza Blossom Server a 6.2.1 con recargas grandes deduplicadas fiables, metadatos NIP-94 y miniaturas multimedia, reempaquetado para StartOS con SDK 2.0.',
    de_DE:
      'Aktualisiert Blossom Server auf 6.2.1 mit zuverlaessigen grossen deduplizierten Uploads, NIP-94-Metadaten und Medienvorschaubildern, neu paketiert fuer StartOS mit SDK 2.0.',
    pl_PL:
      'Aktualizuje Blossom Server do 6.2.1 z niezawodnymi duzymi ponownymi przesylaniami, metadanymi NIP-94 i miniaturami multimediow, przepakowany dla StartOS z SDK 2.0.',
    fr_FR:
      'Met a jour Blossom Server vers 6.2.1 avec des reteleversements volumineux dedupliques fiables, les metadonnees NIP-94 et les miniatures media, reconditionne pour StartOS avec le SDK 2.0.',
  },
  migrations: {
    up: IMPOSSIBLE,
    down: IMPOSSIBLE,
  },
})
