import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EquipmentTypeService } from './equipment-type.service';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Equipment Types')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('equipment-types')
export class EquipmentTypeController {
  constructor(private readonly typeService: EquipmentTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all equipment types' })
  findAll() {
    return this.typeService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new equipment type' })
  create(@Body() dto: CreateEquipmentTypeDto) {
    return this.typeService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an equipment type' })
  remove(@Param('id') id: string) {
    return this.typeService.remove(+id);
  }
}
