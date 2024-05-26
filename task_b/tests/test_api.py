# from datetime import datetime

# from api.app import create_app
# from api.data_fetcher import load_data
# from api.models import EnergyData, db
# from flask import json
# from flask_testing import TestCase


# class TestSetup(TestCase):
#     def create_app(self):
#         # Create an instance of the Flask app configured for testing
#         app = create_app()
#         app.config["TESTING"] = True
#         app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
#         return app

#     def setUp(self):
#         # Set up the database and any other prerequisites
#         db.create_all()

#     def tearDown(self):
#         # Clean up after tests
#         db.session.remove()
#         db.drop_all()


# class TestModels(TestSetup):
#     def test_energydata_model(self):
#         """Test insertion into the EnergyData model"""
#         energy_data = EnergyData(
#             muid="12345", timestamp=datetime.now(), energy=10.5, type="pv"
#         )
#         db.session.add(energy_data)
#         db.session.commit()
#         query = EnergyData.query.first()
#         assert query.muid == "12345"
#         assert query.energy == 10.5
#         assert query.type == "pv"


# class TestDataFetcher(TestSetup):
#     def test_load_data(self):
#         """Test the load_data function with a sample JSON"""
#         sample_data = [
#             {
#                 "tags.muid": "test-muid",
#                 "timestamp": "2023-05-25T14:00:00Z",
#                 "0100011D00FF": 5.5,
#             }
#         ]
#         load_data(json.dumps(sample_data), "pv")
#         result = EnergyData.query.first()
#         assert result.muid == "test-muid"
#         assert result.energy == 5.5
#         assert result.type == "pv"


# class TestAPIEndpoints(TestSetup):
#     def test_get_energy_data(self):
#         """Test the API endpoint to retrieve energy data"""
#         sample_data = EnergyData(
#             muid="test-muid",
#             timestamp=datetime.strptime("2023-05-25T14:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
#             energy=10.5,
#             type="pv",
#         )
#         db.session.add(sample_data)
#         db.session.commit()

#         response = self.client.get("/energydata?type=pv")
#         self.assert200(response)
#         data = json.loads(response.data.decode())
#         assert len(data) == 1
#         assert data[0]["energy"] == 10.5
#         assert data[0]["type"] == "pv"


# # If you use pytest directly
# if __name__ == "__main__":
#     import pytest

#     pytest.main()
