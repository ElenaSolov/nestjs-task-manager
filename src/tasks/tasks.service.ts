import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const query = this.tasksRepository.createQueryBuilder('task');

    const { search, status } = filterDto;

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search) ',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }
  async getById(id: string): Promise<TaskEntity> {
    const found = await this.tasksRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('task not found');
    }
    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const newTask = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.tasksRepository.save(newTask);
    return newTask;
  }
  async updateTask(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getById(id);
    console.log(task);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
  }
}
