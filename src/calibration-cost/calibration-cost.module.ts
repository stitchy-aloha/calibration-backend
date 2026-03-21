import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalibrationCost } from './calibration-cost.entity';
import { CalibrationCostService } from './calibration-cost.service';
import { CalibrationCostController } from './calibration-cost.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CalibrationCost])],
  controllers: [CalibrationCostController],
  providers: [CalibrationCostService],
  exports: [CalibrationCostService],
})
export class CalibrationCostModule {}
