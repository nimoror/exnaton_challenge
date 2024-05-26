import json
import os
from datetime import datetime

import requests
from app import app
from models import EnergyData, db


def download_file(url, filename):
    """Download a file from a URL to a local directory if it's not already there."""
    if not os.path.exists(filename):
        print(f"Downloading {filename}...")
        response = requests.get(url)
        if response.status_code == 200:
            with open(filename, "wb") as f:
                f.write(response.content)
            print(f"Downloaded {filename} successfully.")
            return True  # Indicates successful download
        else:
            print(f"Failed to download {filename}. Status code: {response.status_code}")
            return False
    else:
        print(f"{filename} already exists. No download needed.")
        return True  # File exists, treat as successful for proceeding


def load_data(filepath, data_type):
    """Load data from a JSON file into the database."""
    with open(filepath, "r") as file:
        data = json.load(file)[
            "data"
        ]  # Access the 'data' key which contains the list of measurements.
        with app.app_context():  # Ensure we are in the Flask app context to handle database
            for item in data:
                muid = item["tags"]["muid"]
                timestamp = datetime.strptime(
                    item["timestamp"], "%Y-%m-%dT%H:%M:%S.%fZ"
                )
                measurement = item["measurement"]
                power_keys = ["0100011D00FF", "0100021D00FF"]
                power = None
                for key in power_keys:
                    if key in item:
                        power = item[key]
                        break
                quality = item["tags"]["quality"]
                new_record = EnergyData(
                    muid=muid,
                    timestamp=timestamp,
                    measurement=measurement,
                    quality=quality,
                    power=power,
                    type=data_type,
                )

                db.session.add(new_record)
            db.session.commit()
    print(f"Loaded data from {filepath} into the database.")


def query_random_entries():
    """Query and print some random entries from the energydata table to verify data insertion."""
    with app.app_context():
        random_entries = (
            db.session.query(EnergyData).limit(5).all()
        )  # Fetch 5 random entries
        for entry in random_entries:
            print(
                f"id: {entry.id}, muid: {entry.muid}, timestamp: {entry.timestamp}, type: {entry.type}"
            )


def main():
    # Directory where the JSON files will be saved
    data_dir = "exnaton_challenge/task_b/data"
    os.makedirs(data_dir, exist_ok=True)

    # URLs of the JSON files and their corresponding types
    urls = {
        "95ce3367.json": (
            "https://exnaton-public-s3-bucket20230329123331528000000001.s3.eu-central-1.amazonaws.com/challenge/95ce3367-cbce-4a4d-bbe3-da082831d7bd.json",
            "pv",
        ),
        "1db7649e.json": (
            "https://exnaton-public-s3-bucket20230329123331528000000001.s3.eu-central-1.amazonaws.com/challenge/1db7649e-9342-4e04-97c7-f0ebb88ed1f8.json",
            "load",
        ),
    }

    # Download and load each file if it's not already present
    for filename, (url, type) in urls.items():
        file_path = os.path.join(data_dir, filename)
        if download_file(
            url, file_path
        ):  # Only load data if download was successful or file exists
            load_data(file_path, type)

    # Query some random entries to verify data insertion
    # query_random_entries()


if __name__ == "__main__":
    main()
