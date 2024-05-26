import os
from datetime import datetime

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
    # Fetch query parameters from the URL, if provided
    muid = request.args.get("muid")
    measurement_id = request.args.get("measurement_id")
    data_type = request.args.get("type")
    start_datetime = request.args.get("start")  # Expected in "YYYY-MM-DD-HH-MM"
    end_datetime = request.args.get("end")  # Expected in "YYYY-MM-DD-HH-MM"

    # Start building the database query using the EnergyData model
    query = EnergyData.query

    if muid:
        query = query.filter(EnergyData.muid == muid)
    if measurement_id:
        query = query.filter(EnergyData.measurement_id == measurement_id)
    if data_type:
        query = query.filter(EnergyData.type == data_type)

    # Filter by datetime range
    if start_datetime and end_datetime:
        try:
            start = datetime.strptime(start_datetime, "%Y-%m-%d-%H-%M")
            end = datetime.strptime(end_datetime, "%Y-%m-%d-%H-%M")
            query = query.filter(
                EnergyData.timestamp >= start, EnergyData.timestamp <= end
            )
        except ValueError:
            return jsonify({"error": "Invalid datetime format"}), 400

    results = [
        {
            "muid": record.muid,
            "measurement_id": record.measurement_id,
            "timestamp": record.timestamp.isoformat(),
            "measurement": record.measurement,
            "quality": record.quality,
            "power": record.power,
            "type": record.type,
        }
        for record in query.all()
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
