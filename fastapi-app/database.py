from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://todo_app_render_database_user:s58imWEroNCc141heiJgsblFbwpfD2e1@dpg-cvn5p524d50c73ftpg3g-a.singapore-postgres.render.com/todo_app_render_database"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
