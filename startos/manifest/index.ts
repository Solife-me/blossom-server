import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  // The SDK Makefile reads this field to derive the package filename.
  // deno-fmt-ignore
  id: 'blossom-server',
  title: 'Blossom Server',
  license: 'MIT',
  packageRepo: 'https://github.com/hzrd149/blossom-server',
  upstreamRepo: 'https://github.com/hzrd149/blossom-server',
  marketingUrl: 'https://github.com/hzrd149/blossom-server',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerBuild: {
          workdir: '.',
          dockerfile: 'startos/Dockerfile',
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
