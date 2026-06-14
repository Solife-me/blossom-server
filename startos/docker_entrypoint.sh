#!/bin/bash

set -euo pipefail

cd /app

CONFIG="/data/start9/blossom-config.yml"

if [[ ! -f "${CONFIG}" ]]; then
  echo "Missing rendered StartOS config at ${CONFIG}"
  echo "Open the Blossom Server actions in StartOS and save the configuration once."
  exit 1
fi

exec deno run \
  --allow-net \
  --allow-read \
  --allow-write \
  --allow-env \
  --allow-ffi \
  --allow-sys \
  --allow-run \
  --unstable-bundle \
  main.ts \
  "${CONFIG}"
