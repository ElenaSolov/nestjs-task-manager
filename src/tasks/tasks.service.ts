import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }
  getById(id): ITask {
    return this.tasks.find((task) => task.id === id);
  }
  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;
    const newTask: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }
  updateTask(id: string, status: TaskStatus): ITask {
    const task = this.getById(id);
    task.status = status;
    return task;
  }
  deleteTask(id: string): ITask {
    const deleted = this.getById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return deleted;
  }
}
