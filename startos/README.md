# Blossom Server on StartOS 0.4 beta

This directory contains the StartOS 0.4 beta package wrapper for Blossom Server.

## Build

Run the build from this directory:

```sh
cd startos
make START_CLI=/path/to/start-cli-beta
```

If your `start-cli` on `PATH` is already a StartOS 0.4 beta build, plain `make`
is enough.

The build expects:

- `docker` with `buildx`
- `npm`
- `start-cli` for StartOS 0.4

The package uses `@start9labs/start-sdk@1.5.3`, which emits a StartOS
`0.4.0-beta.9` manifest, and builds the app image from `startos/Dockerfile`
using the repository root as the Docker context.
