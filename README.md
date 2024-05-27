


# Overview

This github project hosts my solution for the Exnaton coding challenge.

It inlcudes three tasks: 
- Task A: Data Analysis
- Task B: Backend
- Task C: Frontend

# Project Structure

exnaton_challenge/
│
├── task_a/                     ### Task A: Data Analysis ###
│   ├── data/                   # Folder for JSON data files
│   │   ├── 1db7649e.json
│   │   └── 95ce3367.json
│   ├── notebooks/              # Jupyter notebooks for analysis
│   │   ├── data_analysis.ipynb 
│   │   └── Profile1.html    
│   └── src/                    # Python scripts for data handling
│       └── download_data.py
│
├── task_b/                     ### Task B: API Development ###
│   ├── api/
│   │   ├── __init__.py         
│   │   ├── app.py                  # Main application file for setting up the API server (Flask)
│   │   ├── data_fetcher.py         # Handles fetching and and commiting data from external source to database
│   │   ├── database.py             # Initializes the database
│   │   ├── models.py               # Defines database schema/models using an ORM approach
│   │   └── instance/
│   │       └── data.db
│   ├── data/
│   │   ├── 1db7649e.json
│   │   └── 95ce3367.json
│   ├── docs/
│   │   ├── api_documentation.md
│   │   └── Dockerfile
│   └── test.py
│
├── task_c/                     ### Task C: Frontend Development ###
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── api.js              # Handles API requests and manages data interaction between the frontend and the backend
│       ├── App.css             # Main CSS file for styling the global aspects of the frontend application
│       ├── App.js              # Main React component that serves as the root of the frontend application, orchestrating other components
│       ├── App.test.js
│       ├── DatePickerStyles.css
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       └── setupTests.js
│
├── .gitignore
└── README.md

# Results

## Task A
The results of task A are visualized and interpreted in task_a/notebooks/data_analysis.ipynb. 

## Task B
Then for the software engineering tasks every tool was new to me so it was more tricky than anticipated. I did not fully understand how to "fake" pull from a non existing API so I simply downloaded the json files through task_b/api/data_fetcher.py. I set up a Flask application which locally works (hosts the db and I can make GET requests), but the  app.py script has to keep running for the db to be accessible and data_fetcher.py has to populate the db each time after rerunning app.py.

## Task C
I set up a React app for the Frontend. Again this only works locally after the command "npm start" in the terminal at the path ../task_c/timeseries-frontend. It accesses the db built in Task B and visualizes the data interactively as in the image below.

![Frontend Screenshot](/exnaton_challenge/images/Frontend_screenshot.png)
*Interactive visualization of energy consumption*

# Getting Started

## Prerequisites
Docker
Node.js and npm
Python 3.11

## Setup and Run Instructions (BEWARE: This is not working (TO-DO)! Only works locally atm!)
Using Docker
Clone the repository:

sh
Code kopieren
git clone https://github.com/your-username/exnaton_challenge.git
cd exnaton_challenge
Build and run the Docker containers:

sh
Code kopieren
docker-compose up --build
Access the API at http://localhost:5000/measurements.

Running Locally
Setup Flask Backend

sh
Code kopieren
cd task_b/api
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt
python app.py
Setup React Frontend

sh
Code kopieren
cd ../../task_c/timeseries-frontend
npm install
npm start
Access the application at http://localhost:3000.


# Contact
If you have any questions or need further assistance, please contact Niccolò Moro at niccolo.moro@gmail.com.