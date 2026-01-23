from app.models.database import SessionLocal
from app.models.models import Event

def reset_status():
    db = SessionLocal()
    events = db.query(Event).all()
    for event in events:
        event.analysis_status = "pending"
        event.impact_score = 0
    db.commit()
    print(f"Reset {len(events)} events to pending.")
    db.close()

if __name__ == "__main__":
    reset_status()
