import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from './equipment.entity.js';
import { CreateEquipmentDto } from './dto/create-equipment.dto.js';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepo: Repository<Equipment>,
  ) {}

  findAll(): Promise<Equipment[]> {
    return this.equipmentRepo.find({ order: { id: 'DESC' } });
  }

  findOne(id: number): Promise<Equipment | null> {
    return this.equipmentRepo.findOne({ where: { id } });
  }

  create(dto: CreateEquipmentDto): Promise<Equipment> {
    const equipment = this.equipmentRepo.create(dto);
    return this.equipmentRepo.save(equipment);
  }
}
