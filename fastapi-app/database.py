from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://todo_db_xe3y_user:3mqziW0oSo7lDbquUiNsZH0z3I2OkMID@dpg-cvtn09a4d50c73ak9s0g-a.oregon-postgres.render.com/todo_db_xe3y"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
