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
import { CalibrationCostService } from './calibration-cost.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';

@ApiTags('Calibration Management')
@Controller('calibration-costs')
export class CalibrationCostController {
  constructor(private readonly costService: CalibrationCostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new calibration cost' })
  create(@Body() createDto: CreateCostDto) {
    return this.costService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all calibration costs' })
  findAll() {
    return this.costService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a calibration cost by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.costService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a calibration cost' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCostDto,
  ) {
    return this.costService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a calibration cost' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.costService.remove(id);
  }
}
