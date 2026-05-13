import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StandardTool } from './standard-tool.entity';

@Entity('standard_tool_categories')
export class StandardToolCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => StandardTool, (tool) => tool.category)
  tools: StandardTool[];
}
