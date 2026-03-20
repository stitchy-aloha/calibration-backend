import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity.js';
import { CreateSectionDto } from './dto/create-section.dto.js';
import { UpdateSectionDto } from './dto/update-section.dto.js';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private sectionRepo: Repository<Section>,
  ) {}

  async create(dto: CreateSectionDto): Promise<Section> {
    const section = this.sectionRepo.create(dto);
    return this.sectionRepo.save(section);
  }

  async findAll(): Promise<Section[]> {
    return this.sectionRepo.find({ relations: ['hospital'] });
  }

  async findOne(id: number): Promise<Section> {
    const section = await this.sectionRepo.findOne({
      where: { id },
      relations: ['hospital'],
    });
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }

  async update(id: number, dto: UpdateSectionDto): Promise<Section> {
    const section = await this.findOne(id);
    Object.assign(section, dto);
    return this.sectionRepo.save(section);
  }

  async remove(id: number): Promise<void> {
    const section = await this.findOne(id);
    await this.sectionRepo.remove(section);
  }

  async findByHospital(hospitalId: number): Promise<Section[]> {
    return this.sectionRepo.find({
      where: { hospitalId },
    });
  }
}
