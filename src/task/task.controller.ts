import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { StorageService } from '../storage/storage.service.js';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { SubmitTaskDto } from './dto/submit-task.dto.js';
import { ApproveTaskDto } from './dto/approve-task.dto.js';

@ApiTags('Task')
@Controller('pm-task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'ดูรายการ Task PM ทั้งหมด (Admin)' })
  @ApiResponse({ status: 200, description: 'คืนค่า Array of Task' })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'เรียกดูข้อมูล Task รายอัน' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
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

  @Patch(':id/submit')
  @ApiOperation({ summary: 'ช่างส่งผลการสอบเทียบ' })
  submit(@Param('id', ParseIntPipe) id: number, @Body() dto: SubmitTaskDto) {
    return this.taskService.submitTask(id, dto);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'อนุมัติงาน PM' })
  approveTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApproveTaskDto,
  ) {
    return this.taskService.approveTask(id, dto);
  }

  @Post(':id/upload-cer')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  @ApiOperation({ summary: 'อัปโหลดไฟล์ CER PDF' })
  async uploadCer(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileUrl = await this.storageService.uploadFile(file, 'certs');
    return this.taskService.updateCerPath(id, fileUrl);
  }
}
