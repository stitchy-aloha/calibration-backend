import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 1, description: 'ID ของหมวดหมู่ที่รายการนี้สังกัด' })
  @IsInt()
  @IsPositive()
  category_id: number;

  @ApiProperty({ example: 'ตรวจสอบสายไฟไม่มีรอยแตก' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1, required: false, description: 'ลำดับการแสดงผล' })
  @IsOptional()
  @IsInt()
  @Min(0)
  display_order?: number;
}
