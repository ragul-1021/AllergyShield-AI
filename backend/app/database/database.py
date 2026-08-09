from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

def get_database_url():
    database_url = os.getenv("DATABASE_URL", "sqlite:///./allergyshield.db").strip()
    database_url = database_url.strip("\"'`")

    if database_url.startswith("DATABASE_URL="):
        database_url = database_url.split("=", 1)[1].strip().strip("\"'`")

    if "YOUR_PASSWORD" in database_url or "YOUR_HOST" in database_url or "YOUR_" in database_url:
        database_url = "sqlite:///./allergyshield.db"

    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)

    if not database_url.startswith(("sqlite://", "postgresql://")):
        database_url = "sqlite:///./allergyshield.db"

    return database_url

DATABASE_URL = get_database_url()

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
    
)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()    
    
