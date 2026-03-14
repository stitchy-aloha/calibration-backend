import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ChecklistCategory } from './checklist-category.entity.js';

@Entity('checklist_items')
export class ChecklistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  category_id: number;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'int', default: 0 })
  display_order: number;

  @ManyToOne(() => ChecklistCategory, (category) => category.items)
  @JoinColumn({ name: 'category_id' })
  category: ChecklistCategory;
}
