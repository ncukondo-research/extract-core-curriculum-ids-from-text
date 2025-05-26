ARG R_VERSION="4.1.2"
ARG QUARTO_VERSION="1.7.17"
ARG PYTHON_VERSION="3.12.0"
ARG UV_VERSION="0.6.0"

FROM ghcr.io/astral-sh/uv:${UV_VERSION} AS uv

FROM rocker/tidyverse:${R_VERSION}

# Fix CRAN mirror
RUN echo 'options(repos = c(CRAN = "https://cloud.r-project.org"))' \
    >> "${R_HOME}/etc/Rprofile.site"

# Install system dependencies together and clear cache
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      libcurl4-openssl-dev libssl-dev libxml2-dev xz-utils cmake curl \
      gdebi-core r-cran-devtools libfontconfig1-dev libfreetype6-dev \
      libharfbuzz-dev libfribidi-dev libpng-dev libtiff5-dev libjpeg-dev \
      libnode-dev \
 && rm -rf /var/lib/apt/lists/*

# Install Quarto CLI & remove .deb
ARG QUARTO_VERSION
RUN curl -L -o quarto.deb \
     "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/quarto-${QUARTO_VERSION}-linux-amd64.deb" \
 && gdebi --non-interactive quarto.deb \
 && rm quarto.deb

# Create renv cache
RUN mkdir -p /home/rstudio/.local/share/renv/cache \
 && chown -R rstudio:rstudio /home/rstudio/.local/share

# Copy uv (for Python package management)
COPY --from=uv /uv /uvx /bin/

# Default user is rstudio
USER rstudio
WORKDIR /home/rstudio/work

# Create Python virtual environment
ARG PYTHON_VERSION
RUN uv venv --python  ${PYTHON_VERSION}

# Set up automatic activation of virtual environment (venv)
RUN echo 'source /home/rstudio/work/.venv/bin/activate' >> /home/rstudio/.bashrc

# Default command
CMD ["bash", "-l"]
