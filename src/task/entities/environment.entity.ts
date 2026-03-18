/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../task.entity.js';

@Entity('environments')
export class Environment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  ambient_temp: number;

  @Column({ type: 'float', nullable: true })
  ambient_humidity: number;

  @ManyToOne(() => Task, (task) => task.environments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column({ nullable: true })
  task_id: number;
}
