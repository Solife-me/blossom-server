#!/bin/bash

set -euo pipefail

cd /app

CONFIG="/data/start9/blossom-config.yml"

if [[ ! -f "${CONFIG}" ]]; then
  echo "Missing rendered StartOS config at ${CONFIG}"
  echo "Open the Blossom Server actions in StartOS and save the configuration once."
  exit 1
fi

export BLOSSOM_REQUIRE_CONFIG=1
exec deno run -P main.ts "${CONFIG}"
