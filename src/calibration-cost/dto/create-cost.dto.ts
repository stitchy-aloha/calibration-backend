import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tool_name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  price?: number;
}
