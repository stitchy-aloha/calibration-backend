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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CalibrationProcessService } from './calibration-process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';

@ApiTags('Calibration Management')
@Controller('calibration-processes')
export class CalibrationProcessController {
  constructor(private readonly processService: CalibrationProcessService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new calibration process' })
  create(@Body() createDto: CreateProcessDto) {
    return this.processService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all calibration processes' })
  findAll() {
    return this.processService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a calibration process by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.processService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a calibration process' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProcessDto,
  ) {
    return this.processService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a calibration process' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.processService.remove(id);
  }
}
