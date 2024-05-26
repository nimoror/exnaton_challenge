# API Documentation

## Endpoints

### GET /measurements

Retrieve measurements from the database.

#### Query Parameters
- `muid`: (Optional) Filter by measurement unit ID.
- `start`: (Optional) Filter measurements from this date (ISO format).
- `stop`: (Optional) Filter measurements until this date (ISO format).

#### Example Request
GET /measurements?muid=95ce3367&start=2023-02-01T00:00:00&stop=2023-03-01T00:00:00

#### Example Response
```json
[
    {
        "muid": "95ce3367",
        "timestamp": "2023-02-01T00:00:00",
        "value": 0.0117
    },
    ...
]

#### 6. Create Dockerfile and docker-compose.yml

**Dockerfile:**
```Dockerfile
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "api/app.py"]