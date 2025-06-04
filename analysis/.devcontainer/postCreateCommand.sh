#!/usr/bin/env bash
set -euo pipefail

# This script is executed as the DevContainer's postCreateCommand.sh and restores R packages from renv.lock.

echo "[postCreateCommand] starting postCreateCommand..."

# renv restore
if [ -d "renv" ]; then
    echo "[postCreateCommand] R package restore started."
    Rscript -e 'if (!requireNamespace("renv", quietly = TRUE)) install.packages("renv",quiet = TRUE, repos = "https://cloud.r-project.org/")'
    Rscript -e "renv::restore()"
else
    echo "[postCreateCommand] renv directory not found. Initializing renv."
    Rscript -e 'if (!requireNamespace("renv", quietly = TRUE)) install.packages("renv",quiet = TRUE, repos = "https://cloud.r-project.org/")'
    Rscript -e "renv::init()"
fi

echo "[postCreateCommand] R package restore completed."

# If pyproject.toml exists, run uv sync
if [ -f "pyproject.toml" ]; then
    echo "[postCreateCommand] Python package sync started."
    uv sync
    . .venv/bin/activate
    echo "[postCreateCommand] Python package sync completed."
else
    echo "[postCreateCommand] pyproject.toml not found. Skipping Python package sync."
fi

