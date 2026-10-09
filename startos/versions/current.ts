import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.4.1:2',
  releaseNotes: {
    en_US:
      'Restores direct StartOS upgrades from Blossom Server 6.2.1:0 while retaining SDK 3.0.3 and the StartOS 0.4.0.2 minimum.',
    es_ES:
      'Restaura las actualizaciones directas de StartOS desde Blossom Server 6.2.1:0, manteniendo SDK 3.0.3 y el requisito minimo de StartOS 0.4.0.2.',
    de_DE:
      'Stellt direkte StartOS-Updates von Blossom Server 6.2.1:0 wieder her und behaelt SDK 3.0.3 sowie StartOS 0.4.0.2 als Mindestversion bei.',
    pl_PL:
      'Przywraca bezposrednie aktualizacje StartOS z Blossom Server 6.2.1:0, zachowujac SDK 3.0.3 i minimalna wersje StartOS 0.4.0.2.',
    fr_FR:
      'Retablit les mises a jour directes de StartOS depuis Blossom Server 6.2.1:0, tout en conservant le SDK 3.0.3 et StartOS 0.4.0.2 comme version minimale.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
