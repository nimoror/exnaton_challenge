Folder structure:

    exnaton_challenge/
    │
    ├── task_a/                   # Task A: Data Exploration
    │   ├── data/                 # Folder for JSON data files
    │   │   ├── 95ce3367.json
    │   │   └── 1db7649e.json
    │   ├── notebooks/            # Jupyter notebooks for exploration
    │   │   └── data_analysis.ipynb
    │   ├── src/                  # Python scripts for analysis
    │   │   └── data_exploration.py
    │   └── results/              # Results and figures
    │       └── initial_plots.png
    │
    ├── task_b/                   # Task B: Backend
    │   ├── api/                  # API source files
    │   │   ├── __init__.py
    │   │   ├── app.py           # Flask/Django application
    │   │   └── models.py        # Database models
    │   ├── tests/                # Tests for the API
    │   │   └── test_api.py
    │   ├── db/                   # Database files
    │   │   └── database.sqlite
    │   ├── docs/                 # API documentation
    │   │   └── api_documentation.md
    │   └── Dockerfile            # Docker file for containerization
    │
    ├── task_c/                   # Task C: Frontend
    │   ├── public/               # Public files like index.html
    │   ├── src/                  # Source files for frontend app
    │   │   ├── App.vue           # Main app component for Vue.js
    │   │   ├── main.js           # Entry point for Vue/React
    │   │   └── components/       # Reusable frontend components
    │   │       └── EnergyChart.vue
    │   ├── build/                # Build configuration files
    │   ├── node_modules/         # Node modules
    │   └── package.json          # NPM package file
    │
    ├── README.md                 # Project overview and instructions
    └── .gitignore                # Specifies intentionally untracked files to ignore