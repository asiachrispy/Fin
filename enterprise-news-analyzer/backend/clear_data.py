from app.models.database import SessionLocal, engine
from app.models.models import Event, Base

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def clear_data():
    db = SessionLocal()
    try:
        # Clean up existing events
        deleted_count = db.query(Event).delete()
        db.commit()
        print(f"Successfully cleared {deleted_count} events.")
    except Exception as e:
        print(f"Error clearing data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    clear_data()
