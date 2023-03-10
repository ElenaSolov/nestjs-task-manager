import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { UpdateStatusDto } from './update-status.dto';
import { TaskEntity } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this.taskService.getTasks(filterDto);
  }
  @Get('/:id')
  getById(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<TaskEntity> {
    const { status } = updateStatusDto;
    return this.taskService.updateTask(id, status);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
