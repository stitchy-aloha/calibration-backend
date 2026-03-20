import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HospitalService } from './hospital.service.js';
import { CreateHospitalDto } from './dto/create-hospital.dto.js';
import { UpdateHospitalDto } from './dto/update-hospital.dto.js';

@ApiTags('Hospital')
@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hospital' })
  @ApiResponse({
    status: 201,
    description: 'The hospital has been successfully created.',
  })
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.create(createHospitalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hospitals' })
  findAll() {
    return this.hospitalService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a hospital by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hospital' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHospitalDto: UpdateHospitalDto,
  ) {
    return this.hospitalService.update(id, updateHospitalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hospital' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalService.remove(id);
  }
}
