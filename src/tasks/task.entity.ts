import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { UserEntity } from '../auth/user.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => UserEntity, (user) => user.tasks, { eager: false })
  user: UserEntity;
}
