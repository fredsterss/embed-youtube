
build: components lib/index.js lib/index.html
	@echo building
	@component build --dev --out public/build

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean