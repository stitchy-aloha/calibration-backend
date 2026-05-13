/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CalibrationSetting } from './calibration-setting.entity';
import { CreateCalibrationSettingDto } from './dto/create-calibration-setting.dto';
import { StandardTool } from '../standard-tool/standard-tool.entity';

@Injectable()
export class CalibrationSettingService {
  constructor(
    @InjectRepository(CalibrationSetting)
    private readonly repository: Repository<CalibrationSetting>,
    @InjectRepository(StandardTool)
    private readonly standardToolRepo: Repository<StandardTool>,
  ) {}

  async findAll() {
    return this.repository.find({ relations: ['standardTools'] });
  }

  async findByEquipment(equipmentName: string) {
    return this.repository.find({
      where: { equipment_name: equipmentName },
      relations: ['standardTools'],
    });
  }

  async batchSave(equipmentName: string, dtos: CreateCalibrationSettingDto[]) {
    console.log(`Saving batch settings for ${equipmentName}:`, JSON.stringify(dtos, null, 2));
    
    // 1. Delete existing settings for this equipment
    // Note: Due to ManyToMany, we might need to be careful, but TypeORM should handle the join table deletion if cascading is set up.
    // If not, we might need to manually clear the relations first, but since we delete the row, it should be fine.
    await this.repository.delete({ equipment_name: equipmentName });

    // 2. Save new settings
    const savedEntities: CalibrationSetting[] = [];
    
    for (const dto of dtos) {
      const entity = this.repository.create({
        ...dto,
        equipment_name: equipmentName,
      });

      if (dto.standard_tool_ids && dto.standard_tool_ids.length > 0) {
        entity.standardTools = await this.standardToolRepo.find({
          where: { id: In(dto.standard_tool_ids) }
        });
      } else {
        entity.standardTools = [];
      }

      savedEntities.push(await this.repository.save(entity));
    }

    return savedEntities;
  }

  async deleteByEquipment(equipmentName: string) {
    return this.repository.delete({ equipment_name: equipmentName });
  }
}
