import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @IsNotEmpty()
  @Column()
  username: string;

  @Column()
  password: string;
}
