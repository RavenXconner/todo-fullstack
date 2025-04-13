from sqlalchemy.orm import Session
import models
import schemas


def get_tasks(db: Session, completed: bool | None = None):
    if completed is None:
        return db.query(models.Task).all()
    return db.query(models.Task).filter(models.Task.completed == completed).all()

def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task: schemas.TaskUpdate):
    db_task = get_task(db, task_id)
    if db_task:
        if task.title is not None:
            db_task.title = task.title
        if task.completed is not None:
            db_task.completed = task.completed
        db.commit()
        db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task
