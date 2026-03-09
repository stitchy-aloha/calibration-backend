import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
