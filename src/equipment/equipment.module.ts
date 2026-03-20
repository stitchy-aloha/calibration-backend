import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './equipment.entity';
import { EquipmentType } from './equipment-type.entity';
import { EquipmentService } from './equipment.service';
import { EquipmentTypeService } from './equipment-type.service';
import { EquipmentController } from './equipment.controller';
import { EquipmentTypeController } from './equipment-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, EquipmentType])],
  controllers: [EquipmentController, EquipmentTypeController],
  providers: [EquipmentService, EquipmentTypeService],
  exports: [EquipmentService, EquipmentTypeService],
})
export class EquipmentModule {}
