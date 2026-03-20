import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({ example: 'กลุ่มงานการพยาบาล' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'NUR', required: false })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ example: 'แผนกการพยาบาล', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  hospitalId: number;
}
