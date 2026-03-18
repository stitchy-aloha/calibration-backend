/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../task.entity.js';

@Entity('measurements')
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  parameter_name: string;

  @Column({ type: 'float', nullable: true })
  range: number;

  @Column({ type: 'float', nullable: true })
  standard_value: number;

  @Column({ type: 'float', nullable: true })
  reading_1: number;

  @Column({ type: 'float', nullable: true })
  reading_2: number;

  @Column({ type: 'float', nullable: true })
  reading_3: number;

  @Column({ type: 'float', nullable: true })
  average_value: number;

  @Column({ type: 'float', nullable: true })
  error_value: number;

  @Column({ type: 'enum', enum: ['PASS', 'FAIL'], default: 'PASS' })
  result: 'PASS' | 'FAIL';

  @ManyToOne(() => Task, (task) => task.measurements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column({ nullable: true })
  task_id: number;
}
