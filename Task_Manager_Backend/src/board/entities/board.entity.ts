import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];

  @ManyToMany(() => User, (user) => user.boards)
  @JoinTable()
  users!: User[];
}
