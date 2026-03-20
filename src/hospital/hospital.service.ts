import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity.js';
import { CreateHospitalDto } from './dto/create-hospital.dto.js';
import { UpdateHospitalDto } from './dto/update-hospital.dto.js';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepo: Repository<Hospital>,
  ) {}

  async create(dto: CreateHospitalDto): Promise<Hospital> {
    const hospital = this.hospitalRepo.create(dto);
    return this.hospitalRepo.save(hospital);
  }

  async findAll(): Promise<Hospital[]> {
    return this.hospitalRepo.find({ relations: ['sections'] });
  }

  async findOne(id: number): Promise<Hospital> {
    const hospital = await this.hospitalRepo.findOne({
      where: { id },
      relations: ['sections'],
    });
    if (!hospital) {
      throw new NotFoundException(`Hospital with ID ${id} not found`);
    }
    return hospital;
  }

  async update(id: number, dto: UpdateHospitalDto): Promise<Hospital> {
    const hospital = await this.findOne(id);
    Object.assign(hospital, dto);
    return this.hospitalRepo.save(hospital);
  }

  async remove(id: number): Promise<void> {
    const hospital = await this.findOne(id);
    await this.hospitalRepo.remove(hospital);
  }
}
