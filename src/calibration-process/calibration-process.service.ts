import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalibrationProcess } from './calibration-process.entity';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';

@Injectable()
export class CalibrationProcessService {
  constructor(
    @InjectRepository(CalibrationProcess)
    private readonly processRepo: Repository<CalibrationProcess>,
  ) {}

  findAll(): Promise<CalibrationProcess[]> {
    return this.processRepo.find({
      relations: ['standardTool'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CalibrationProcess> {
    const process = await this.processRepo.findOne({
      where: { id },
      relations: ['standardTool'],
    });
    if (!process) {
      throw new NotFoundException(`Calibration Process #${id} not found`);
    }
    return process;
  }

  create(dto: CreateProcessDto): Promise<CalibrationProcess> {
    const process = this.processRepo.create(dto);
    return this.processRepo.save(process);
  }

  async update(id: number, dto: UpdateProcessDto): Promise<CalibrationProcess> {
    const process = await this.findOne(id);
    Object.assign(process, dto);
    return this.processRepo.save(process);
  }

  async remove(id: number): Promise<void> {
    const process = await this.findOne(id);
    await this.processRepo.remove(process);
  }
}
