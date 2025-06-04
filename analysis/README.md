# Analysis of Extract Core Curriculum Codes from Text

This is a R project that analyzes the extracted core curriculum codes from text using the OpenAI API.

## Directories

```plain
.
├── .devcontainer/
├── data/
│   ├── all-ids.csv
│   └── data.csv
├── results/
├── renv/
├── renv.lock
├── analysis.r
└── README.md
```

- `.devcontainer/`: Contains the [development container](https://containers.dev/) configuration. With docker and the devcontainer extension, you can reproduce the environment used for analysis.
- `data/`: Contains the data files used in the analysis.
    - `all-ids.json`: Contains all ID candidates.
    - `data.json`: Contains the data used for analysis.
- `renv/`, `renv.lock`: Contains the R environment configuration.
- `results/`: Contains the results of the analysis.
- `analysis.r`: The main R script that performs the analysis.
- `README.md`: This file, which provides an overview of the project and its structure.

