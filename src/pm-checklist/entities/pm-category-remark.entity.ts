import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../../task/task.entity.js';
import { ChecklistCategory } from './checklist-category.entity.js';

@Entity('pm_category_remarks')
export class PmCategoryRemark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  task_id: number;

  @Column({ type: 'int' })
  category_id: number;

  @Column({ type: 'text', nullable: true })
  text: string;

  @ManyToOne(() => Task, { nullable: false })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => ChecklistCategory, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: ChecklistCategory;
}
