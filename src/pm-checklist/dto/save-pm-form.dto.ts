import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ItemResultDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  item_id: number;

  @ApiProperty({ example: 'Pass', enum: ['Pass', 'Fail', 'NA'] })
  @IsIn(['Pass', 'Fail', 'NA'])
  status: 'Pass' | 'Fail' | 'NA';
}

export class RemarkDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  category_id: number;

  @ApiProperty({ example: 'สายไฟชำรุดเล็กน้อย', required: false })
  @IsOptional()
  @IsString()
  text?: string;
}

export class SavePmFormDto {
  @ApiProperty({ example: 123 })
  @IsInt()
  task_id: number;

  @ApiProperty({ example: 'Pass', enum: ['Pass', 'Fail', 'NA'] })
  @IsIn(['Pass', 'Fail', 'NA'])
  overall_result: 'Pass' | 'Fail' | 'NA';

  @ApiProperty({ example: 'Done', enum: ['Pending', 'InProgress', 'Done'] })
  @IsIn(['Pending', 'InProgress', 'Done'])
  status: 'Pending' | 'InProgress' | 'Done';

  @ApiProperty({ type: [ItemResultDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemResultDto)
  results: ItemResultDto[];

  @ApiProperty({ type: [RemarkDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RemarkDto)
  remarks: RemarkDto[];

  @ApiProperty({
    example: 'path_pdf_pm',
    required: false,
    description: 'Path to PDF file (set by system when status = Done)',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  path_pdf_pm?: string;
}
