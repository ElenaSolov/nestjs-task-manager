import { Injectable, Put } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks() {
    return this.tasks;
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
}
