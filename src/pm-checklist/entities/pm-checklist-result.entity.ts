import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../../task/task.entity.js';
import { ChecklistItem } from './checklist-item.entity.js';

export type ItemStatus = 'Pass' | 'Fail' | 'NA';

@Entity('pm_checklist_results')
export class PmChecklistResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  task_id: number;

  @Column({ type: 'int' })
  item_id: number;

  @Column({ type: 'varchar', length: 10 })
  status: ItemStatus;

  @ManyToOne(() => Task, { nullable: false })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => ChecklistItem, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item: ChecklistItem;
}
