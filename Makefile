.DEFAULT_GOAL := develop

INSTALL_DIR := /usr/local/Cellar/node/12.10.0/lib/node_modules/typescript/bin/
TSC := $(INSTALL_DIR)tsc


production:
	@echo "Build Production"
	mkdir -p addon
	cp index.html ./addon
	cp ./tsc-build/addon.js ./addon
	mkdir -p addon/lib
	cp lib/*.js ./addon/lib
	cp ./node_modules/onsenui/css/onsen-css-components.css ./addon/lib
	cp ./node_modules/onsenui/js/onsenui.js ./addon/lib
	cp ./extension/manifest.json ./addon

develop:
	@echo "Start Development.."
	$(TSC) -w

server:
	@echo "Start server. Port 4000"
	php -S localhost:4000 -t ./addon/

clean:
	rm -rf addon

clean-tsc:
	rm -rf tsc-build