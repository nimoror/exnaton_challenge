# models.py
from database import db


class EnergyData(db.Model):
    __tablename__ = "energydata"  # Explicit table name setting (if absent, it defaults to class name in lowercase)
    id = db.Column(db.Integer, primary_key=True)
    muid = db.Column(db.String(36), nullable=False)
    measurement_id = db.Column(db.String(36), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    measurement = db.Column(db.String(36), nullable=False)
    quality = db.Column(db.String(36), nullable=True)  # To store the quality values
    power = db.Column(db.Float, nullable=True)  # To store the power (MW) values
    type = db.Column(db.String(36))  # 'pv' or 'load'

    @classmethod
    def insert_data(
        cls, muid, measurement_id, timestamp, measurement, quality, power, type
    ):
        record = cls(
            muid=muid,
            measurement_id=measurement_id,
            timestamp=timestamp,
            measurement=measurement,
            quality=quality,
            power=power,
            type=type,
        )
        db.session.add(record)
        db.session.commit()
