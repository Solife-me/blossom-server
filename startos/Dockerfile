FROM ghcr.io/denoland/deno:debian

WORKDIR /app

RUN apt-get update && \
  apt-get install -y --no-install-recommends ca-certificates ffmpeg && \
  rm -rf /var/lib/apt/lists/*

COPY deno.json deno.lock ./
COPY main.ts ./
RUN mkdir -p /app/public
COPY public/favicon.ico ./public/favicon.ico
COPY src/ ./src/
COPY startos/docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh

RUN chmod +x /usr/local/bin/docker_entrypoint.sh
RUN deno bundle --config src/landing/client/deno.json --minify --platform browser -o public/client.js src/landing/client/index.tsx
RUN deno cache --unstable-bundle main.ts

VOLUME ["/data"]

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
