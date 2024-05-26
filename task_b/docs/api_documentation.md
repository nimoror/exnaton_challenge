# Energy Data API Documentation

## Overview
This API provides access to energy data collected and stored in an SQLite database, allowing retrieval based on various parameters including measurement ID, data type, and datetime range.

## API Endpoints

### 1. Root Endpoint

- **Endpoint:** `/`
- **Method:** GET
- **Description:** Provides a simple greeting, useful for initial health checks of the API.
- **Response:**
  - `200 OK`: Returns a simple greeting message.
  - **Example Response:**
    ```json
    "Hello, World!"
    ```

### 2. Fetch Energy Data

- **Endpoint:** `/energydata`
- **Method:** GET
- **Description:** Retrieves energy data filtered by optional parameters such as measurement unit ID (`muid`), measurement ID (`measurement_id`), type of data (`type`), and a datetime range (`start` and `end`).
- **Query Parameters:**
  - `muid` (optional): Filters data by the measurement unit ID.
  - `measurement_id` (optional): Filters data by specific measurement ID.
  - `type` (optional): Filters data by type (e.g., 'pv', 'load').
  - `start` (optional but requires `end` if used): Start of the datetime range, format "YYYY-MM-DD-HH-MM".
  - `end` (optional but requires `start` if used): End of the datetime range, format "YYYY-MM-DD-HH-MM".
- **Success Response:**
  - **Code:** `200 OK`
  - **Content Example:**
    ```json
    [
        {
            "muid": "example_id",
            "measurement_id": "0100021D00FF",
            "timestamp": "2023-01-01T00:00:00Z",
            "measurement": "energy",
            "quality": "measured",
            "power": 12.34,
            "type": "pv"
        }
    ]
    ```
- **Error Response:**
  - **Code:** `400 Bad Request`
  - **Content:** `{ "error": "Invalid datetime format" }`
  - **Description:** Returned if the `start` or `end` datetime parameters are provided but do not match the required format.

## Running the API

To run the API locally:

1. Ensure Python and Flask are installed.
2. Navigate to the project directory.
3. Execute the command: `python app.py`
4. Access the API through `http://localhost:5000/`.

