import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}
  // getAllTasks(): ITask[] {
  //   return this.tasks;
  // }
  async getById(id): Promise<TaskEntity> {
    const found = await this.tasksRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('task not found');
    }
    return found;
  }
  // getTasksWithFilter(filterDto: GetTasksFilterDto): ITask[] {
  //   const { search, status } = filterDto;
  //   console.log(status);
  //   let tasks = this.tasks;
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       return (
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //       );
  //     });
  //   }
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //     console.log(tasks);
  //   }
  //   return tasks;
  // }
  //
  // createTask(createTaskDto: CreateTaskDto): ITask {
  //   const { title, description } = createTaskDto;
  //   const newTask: ITask = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(newTask);
  //   return newTask;
  // }
  // updateTask(id: string, status: TaskStatus): ITask {
  //   const task = this.getById(id);
  //   task.status = status;
  //   return task;
  // }
  // deleteTask(id: string): ITask {
  //   const deleted = this.getById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  //   return deleted;
  // }
}
