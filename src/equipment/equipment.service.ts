import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from './equipment.entity.js';
import { CreateEquipmentDto } from './dto/create-equipment.dto.js';
import { UpdateEquipmentDto } from './dto/update-equipment.dto.js';

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

  async update(id: number, dto: UpdateEquipmentDto): Promise<Equipment> {
    const equipment = await this.findOne(id);
    if (!equipment) {
      throw new NotFoundException(`Equipment #${id} not found`);
    }
    Object.assign(equipment, dto);
    return this.equipmentRepo.save(equipment);
  }

  async remove(id: number): Promise<void> {
    const equipment = await this.findOne(id);
    if (!equipment) {
      throw new NotFoundException(`Equipment #${id} not found`);
    }
    await this.equipmentRepo.softRemove(equipment);
  }
}
