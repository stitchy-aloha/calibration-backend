import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Section } from '../../section/entities/section.entity.js';

@Entity('hospital')
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  province: string;

  @OneToMany(() => Section, (section) => section.hospital)
  sections: Section[];
}
