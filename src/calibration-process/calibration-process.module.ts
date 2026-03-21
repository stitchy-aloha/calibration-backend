import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalibrationProcess } from './calibration-process.entity';
import { CalibrationProcessService } from './calibration-process.service';
import { CalibrationProcessController } from './calibration-process.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CalibrationProcess])],
  controllers: [CalibrationProcessController],
  providers: [CalibrationProcessService],
  exports: [CalibrationProcessService],
})
export class CalibrationProcessModule {}
