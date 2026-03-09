/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChecklistItem } from './checklist-item.entity';

@Entity('checklist_categories')
export class ChecklistCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', default: 0 })
  display_order: number;

  @OneToMany(() => ChecklistItem, (item) => item.category, { eager: true })
  items: ChecklistItem[];
}
