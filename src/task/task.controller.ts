import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@ApiTags('Task')
@Controller('pm-task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'ดูรายการ Task PM ทั้งหมด (Admin)' })
  @ApiResponse({ status: 200, description: 'คืนค่า Array of Task' })
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Admin สร้าง Task PM ใหม่และ assign ช่าง' })
  @ApiResponse({
    status: 201,
    description: 'Task ถูกสร้างสำเร็จ พร้อม task_id',
  })
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }
}
