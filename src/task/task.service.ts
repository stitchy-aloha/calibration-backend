import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepo.find({
      relations: ['technician', 'equipment'],
      order: { id: 'DESC' },
    });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const year = new Date().getFullYear();
    const count = await this.taskRepo.count();
    const pm_no = `PM-${year}-${String(count + 1).padStart(4, '0')}`;

    const task = this.taskRepo.create({
      equipment_id: dto.equipment_id,
      task_user: dto.task_user,
      status: 'Pending',
      pm_no,
    });
    return this.taskRepo.save(task);
  }
}
