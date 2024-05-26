import os

from database import db
from flask import Flask, jsonify, request
from models import EnergyData

# Create a new Flask application instance
app = Flask(__name__)

# Configure the Flask application to use SQLite as the database
base_dir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"sqlite:///{os.path.join(base_dir, 'instance', 'data.db')}"
)
# Disable the modification tracking system of SQLAlchemy to save system resources
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize the database with the Flask app, making db ready to interact with the application
db.init_app(app)


# Define a route for the root URL of the application
@app.route("/")
def index():
    # This function responds to requests for the root URL with a simple greeting.
    # This route can serve as a simple health check for your application.
    return "Hello, World!"


# Define a route to access energy data, this route allows querying by 'muid' and 'type'
@app.route("/energydata")
def get_energy_data():
    # Retrieve query parameters from the URL, if provided
    muid = request.args.get("muid", default=None, type=str)
    data_type = request.args.get("type", default=None, type=str)

    # Start building the database query using the EnergyData model
    query = EnergyData.query

    # If a 'muid' parameter is provided, filter results by 'muid'
    if muid:
        query = query.filter_by(muid=muid)
    # If a 'type' parameter is provided, filter results by 'type'
    if data_type:
        query = query.filter_by(type=data_type)

    # Execute the query and format each resulting record as a dictionary
    results = [
        {
            "muid": d.muid,
            "measurement_id": d.id,
            "timestamp": d.timestamp.isoformat(),
            "measurement": d.measurement,
            "quality": d.quality,
            "power": d.power,
            "type": d.type,
        }
        for d in query.all()
    ]

    # Convert the list of dictionaries to a JSON response to return to the client
    return jsonify(results)


if __name__ == "__main__":
    # Run the following block only if the script is executed directly (not imported)
    with app.app_context():
        # Ensure that all tables are created according to the models defined before starting the application
        db.create_all()
        print("Tables created.")
    # Start the Flask application on the default port (5000) with debugging enabled
    app.run(debug=True)
