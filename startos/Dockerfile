# syntax=docker/dockerfile:1

FROM denoland/deno:debian

WORKDIR /app

RUN apt-get update && \
  apt-get install -y --no-install-recommends ca-certificates ffmpeg && \
  rm -rf /var/lib/apt/lists/*

COPY deno.json deno.lock ./
COPY tailwind.config.js ./
COPY main.ts ./
COPY public/ ./public/
COPY src/ ./src/
COPY startos/docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh

RUN chmod +x /usr/local/bin/docker_entrypoint.sh
RUN deno cache main.ts && deno task build

VOLUME ["/data"]

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
