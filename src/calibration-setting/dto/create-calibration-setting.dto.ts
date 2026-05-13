/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICalibrationTestValue } from '../calibration-setting.entity';

export class CreateCalibrationSettingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  equipment_name: string;

  @ApiProperty({ enum: ['quantitative', 'qualitative'] })
  @IsEnum(['quantitative', 'qualitative'])
  type: 'quantitative' | 'qualitative';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parameter_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  unit?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tolerance?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  std_type?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  display_type?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  resolution?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  uncertainty?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  ucb1?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  ucb2?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  ucb3?: string;

  @ApiProperty({ isArray: true, type: () => Object })
  @IsOptional()
  test_values?: ICalibrationTestValue[];

  @ApiProperty({ type: [Number], required: false })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  category_ids?: number[];
}
