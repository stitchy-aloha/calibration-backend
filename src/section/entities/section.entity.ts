import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Hospital } from '../../hospital/entities/hospital.entity.js';
import { Equipment } from '../../equipment/equipment.entity.js';

@Entity('section')
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column()
  hospitalId: number;

  @ManyToOne(() => Hospital, (hospital) => hospital.sections)
  @JoinColumn({ name: 'hospitalId' })
  hospital: Hospital;

  @OneToMany(() => Equipment, (equipment) => equipment.section)
  equipments: Equipment[];
}
