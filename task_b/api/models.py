# models.py
from database import db


class EnergyData(db.Model):
    __tablename__ = "energydata"  # Explicit table name setting (if absent, it defaults to class name in lowercase)
    id = db.Column(db.Integer, primary_key=True)
    muid = db.Column(db.String(36), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    energy = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(50))  # 'pv' or 'load'

    @classmethod
    def insert_data(cls, muid, timestamp, energy, type):
        record = cls(muid=muid, timestamp=timestamp, energy=energy, type=type)
        db.session.add(record)
        db.session.commit()
