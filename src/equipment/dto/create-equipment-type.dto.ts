import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipmentTypeDto {
  @ApiProperty({ example: 'Medical' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Medical device for monitoring patient vitals',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
