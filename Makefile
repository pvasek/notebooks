PORT ?= 8000

.PHONY: run help

run: ## Start a local static server (default port 8000; override with PORT=…)
	@echo "→ http://localhost:$(PORT)/"
	@echo "→ http://localhost:$(PORT)/topics/physics/optika/"
	@python3 -m http.server $(PORT)

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ {printf "  \033[1m%-10s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
