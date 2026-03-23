/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalibrationSetting } from './calibration-setting.entity';
import { CreateCalibrationSettingDto } from './dto/create-calibration-setting.dto';

@Injectable()
export class CalibrationSettingService {
  constructor(
    @InjectRepository(CalibrationSetting)
    private readonly repository: Repository<CalibrationSetting>,
  ) {}

  async findAll() {
    return this.repository.find({ relations: ['standardTool'] });
  }

  async findByEquipment(equipmentName: string) {
    return this.repository.find({
      where: { equipment_name: equipmentName },
      relations: ['standardTool'],
    });
  }

  async batchSave(equipmentName: string, dtos: CreateCalibrationSettingDto[]) {
    console.log(`Saving batch settings for ${equipmentName}:`, JSON.stringify(dtos, null, 2));
    // 1. Delete existing settings for this equipment
    await this.repository.delete({ equipment_name: equipmentName });

    // 2. Save new settings
    const entities = dtos.map((dto) => this.repository.create({ ...dto, equipment_name: equipmentName }));
    console.log('Entities to save:', JSON.stringify(entities, null, 2));
    return this.repository.save(entities);
  }

  async deleteByEquipment(equipmentName: string) {
    return this.repository.delete({ equipment_name: equipmentName });
  }
}
