import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRole } from './user.role';
import { Exclude } from 'class-transformer';
import { Board } from '../../board/entities/board.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
@Unique(['email'])
@Unique(['phone'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @ManyToMany(() => Board, (board) => board.users)
  boards!: Board[];
}
