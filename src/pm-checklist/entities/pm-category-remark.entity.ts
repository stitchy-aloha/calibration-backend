import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
