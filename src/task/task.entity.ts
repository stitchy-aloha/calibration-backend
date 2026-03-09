import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity.js';

export type TaskStatus = 'Pending' | 'InProgress' | 'Done';
export type OverallResult = 'Pass' | 'Fail' | 'NA';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  equipment_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  pm_no: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  overall_result: OverallResult;

  @Column({ type: 'varchar', length: 20, nullable: true })
  status: TaskStatus;

  @Column({ type: 'varchar', length: 500, nullable: true })
  path_pdf_pm: string;

  @Column({ type: 'int', nullable: true })
  task_user: number;

  @ManyToOne(() => User, { nullable: true, eager: false })
  @JoinColumn({ name: 'task_user' })
  technician: User;
}
