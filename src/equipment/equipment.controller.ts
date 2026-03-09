import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { EquipmentService } from './equipment.service.js';
import { CreateEquipmentDto } from './dto/create-equipment.dto.js';

@ApiTags('Equipment')
@Controller('equipment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  @ApiOperation({ summary: 'ดูรายการเครื่องมือทั้งหมด' })
  @ApiResponse({ status: 200, description: 'คืนค่า Array of Equipment' })
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดูเครื่องมือตาม ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'คืนค่า Equipment' })
  @ApiResponse({ status: 404, description: 'ไม่พบเครื่องมือ' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const equipment = await this.equipmentService.findOne(id);
    if (!equipment) {
      throw new NotFoundException(`Equipment #${id} not found`);
    }
    return equipment;
  }

  @Post()
  @ApiOperation({ summary: 'เพิ่มเครื่องมือใหม่' })
  @ApiResponse({ status: 201, description: 'เพิ่มเครื่องมือสำเร็จ' })
  create(@Body() dto: CreateEquipmentDto) {
    return this.equipmentService.create(dto);
  }
}
