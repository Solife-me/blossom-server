import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v6_2_1_0 } from './v6_2_1_0'
import { v6_4_1_0 } from './v6_4_1_0'
import { v6_4_1_1 } from './v6_4_1_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v6_2_1_0, v6_4_1_0, v6_4_1_1],
})
