
build: components lib/index.js lib/index.html
	@echo building
	@minstache < lib/template.mustache > lib/template.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
