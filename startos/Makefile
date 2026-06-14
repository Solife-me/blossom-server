PACKAGE_ID := blossom-server
ARCHES ?= x86_64 aarch64
START_CLI ?= start-cli

.PHONY: all clean install x86 x86_64 arm arm64 aarch64
.DELETE_ON_ERROR:

all: $(ARCHES:%=$(PACKAGE_ID)_%.s9pk)

x86 x86_64: $(PACKAGE_ID)_x86_64.s9pk
arm arm64 aarch64: $(PACKAGE_ID)_aarch64.s9pk

APP_FILES := $(shell find ../src ../public -type f 2>/dev/null)

$(PACKAGE_ID)_%.s9pk: javascript/index.js icon.png LICENSE assets Dockerfile docker_entrypoint.sh ../deno.json ../deno.lock ../main.ts ../instructions.md $(APP_FILES)
	cd .. && $(START_CLI) s9pk pack . --javascript ./startos/javascript --icon ./startos/icon.png --license ./startos/LICENSE --assets ./startos/assets --arch=$* -o startos/$@

javascript/index.js: $(shell find startos -type f -name '*.ts') package.json package-lock.json | node_modules
	npm run check
	npm run build

node_modules: package.json package-lock.json
	npm ci

install: all
	$(START_CLI) package install -s $$($(START_CLI) s9pk select)

clean:
	rm -rf javascript node_modules $(PACKAGE_ID)_x86_64.s9pk $(PACKAGE_ID)_aarch64.s9pk
