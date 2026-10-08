import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '6.4.1:1',
  releaseNotes: {
    en_US:
      'Repackages Blossom Server 6.4.1 with StartOS SDK 3.0.3, requiring StartOS 0.4.0.2 or later.',
    es_ES:
      'Reempaqueta Blossom Server 6.4.1 con StartOS SDK 3.0.3 y requiere StartOS 0.4.0.2 o posterior.',
    de_DE:
      'Packt Blossom Server 6.4.1 mit StartOS SDK 3.0.3 neu und erfordert StartOS 0.4.0.2 oder neuer.',
    pl_PL:
      'Pakuje ponownie Blossom Server 6.4.1 z StartOS SDK 3.0.3 i wymaga StartOS 0.4.0.2 lub nowszego.',
    fr_FR:
      'Reconditionne Blossom Server 6.4.1 avec StartOS SDK 3.0.3 et necessite StartOS 0.4.0.2 ou version ulterieure.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
