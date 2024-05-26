from app import app, db
from sqlalchemy import inspect

with app.app_context():
    # Create an inspector object using the current database engine
    inspector = inspect(db.engine)

    # Retrieve all table names using the inspector
    table_names = inspector.get_table_names()
    print(table_names)
