import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v6_4_1_0 } from './v6_4_1_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v6_4_1_0],
})
