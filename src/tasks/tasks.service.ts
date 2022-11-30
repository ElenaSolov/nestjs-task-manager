import { Injectable } from '@nestjs/common';
import { ITask } from './task.model';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks() {
    return this.tasks;
  }
}
