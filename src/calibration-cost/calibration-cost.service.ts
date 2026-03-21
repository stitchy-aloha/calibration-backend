import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalibrationCost } from './calibration-cost.entity';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';

@Injectable()
export class CalibrationCostService {
  constructor(
    @InjectRepository(CalibrationCost)
    private readonly costRepo: Repository<CalibrationCost>,
  ) {}

  findAll(): Promise<CalibrationCost[]> {
    return this.costRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<CalibrationCost> {
    const cost = await this.costRepo.findOne({ where: { id } });
    if (!cost) {
      throw new NotFoundException(`Calibration Cost #${id} not found`);
    }
    return cost;
  }

  create(dto: CreateCostDto): Promise<CalibrationCost> {
    const cost = this.costRepo.create(dto);
    return this.costRepo.save(cost);
  }

  async update(id: number, dto: UpdateCostDto): Promise<CalibrationCost> {
    const cost = await this.findOne(id);
    Object.assign(cost, dto);
    return this.costRepo.save(cost);
  }

  async remove(id: number): Promise<void> {
    const cost = await this.findOne(id);
    await this.costRepo.remove(cost);
  }
}
