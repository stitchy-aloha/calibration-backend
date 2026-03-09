import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import type { EquipmentStatus } from '../equipment.entity.js';

export class CreateEquipmentDto {
  @ApiProperty({ example: 'เครื่องวัดความดัน' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'AST-0001', required: false })
  @IsOptional()
  @IsString()
  asset_code?: string;

  @ApiProperty({ example: 'SN-12345', required: false })
  @IsOptional()
  @IsString()
  serial_number?: string;

  @ApiProperty({ example: 'Omron', required: false })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiProperty({ example: 'HEM-7120', required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({
    example: 'active',
    enum: ['active', 'inactive', 'maintenance'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'maintenance'])
  status?: EquipmentStatus;

  @ApiProperty({
    example: 365,
    description: 'รอบการ calibrate (วัน)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  interval?: number;
}
