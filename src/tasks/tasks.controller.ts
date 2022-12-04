import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { UpdateStatusDto } from './update-status.dto';
import { TaskEntity } from './task.entity';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }
  @Get(':id')
  getById(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto);
  }
  //
  // @Patch(':id')
  // updateTask(@Param('id') id, @Body() updateStatusDto: UpdateStatusDto) {
  //   const { status } = updateStatusDto;
  //   return this.taskService.updateTask(id, status);
  // }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
