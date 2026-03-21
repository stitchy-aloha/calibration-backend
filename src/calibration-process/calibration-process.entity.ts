import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StandardTool } from '../standard-tool/standard-tool.entity';

@Entity('calibration_processes')
export class CalibrationProcess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  parameter_name: string;

  @Column({ type: 'text', nullable: true })
  procedure: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit: string;

  @Column({ type: 'int', nullable: true })
  standard_tool_id: number;

  @ManyToOne(() => StandardTool)
  @JoinColumn({ name: 'standard_tool_id' })
  standardTool: StandardTool;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
