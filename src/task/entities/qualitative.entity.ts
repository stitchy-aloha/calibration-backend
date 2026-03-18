/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../task.entity.js';

@Entity('qualitatives')
export class Qualitative {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  parameter_name: string | null;

  @Column({ type: 'varchar', length: 255 })
  item_name: string;

  @Column({ type: 'enum', enum: ['PASS', 'FAIL', 'NA'], default: 'PASS' })
  result: 'PASS' | 'FAIL' | 'NA';

  @ManyToOne(() => Task, (task) => task.qualitatives, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column({ nullable: true })
  task_id: number;
}
