import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDto } from './create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getById(@Param('id') id: string): ITask {
    return this.taskService.getById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  updateTask(@Param('id') id, @Body('status') status) {
    return this.taskService.updateTask(id, status);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): ITask {
    return this.taskService.deleteTask(id);
  }
}
