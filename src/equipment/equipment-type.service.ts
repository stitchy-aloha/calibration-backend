import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentType } from './equipment-type.entity';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';

@Injectable()
export class EquipmentTypeService {
  constructor(
    @InjectRepository(EquipmentType)
    private readonly typeRepo: Repository<EquipmentType>,
  ) {}

  findAll(): Promise<EquipmentType[]> {
    return this.typeRepo.find({ order: { name: 'ASC' } });
  }

  findOne(id: number): Promise<EquipmentType | null> {
    return this.typeRepo.findOne({ where: { id } });
  }

  create(dto: CreateEquipmentTypeDto): Promise<EquipmentType> {
    const type = this.typeRepo.create(dto);
    return this.typeRepo.save(type);
  }

  async remove(id: number): Promise<void> {
    const type = await this.findOne(id);
    if (!type) {
      throw new NotFoundException(`Equipment Type #${id} not found`);
    }
    await this.typeRepo.softRemove(type);
  }
}
