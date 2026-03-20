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
import { SectionService } from './section.service.js';
import { CreateSectionDto } from './dto/create-section.dto.js';
import { UpdateSectionDto } from './dto/update-section.dto.js';

@ApiTags('Section')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({
    status: 201,
    description: 'The section has been successfully created.',
  })
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sections' })
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a section by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a section' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a section' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.remove(id);
  }
}
