import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProcessDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parameter_name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  procedure?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  unit?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  standard_tool_id?: number;
}
