import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'ระบบไฟฟ้า' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, required: false, description: 'ลำดับการแสดงผล' })
  @IsOptional()
  @IsInt()
  @Min(0)
  display_order?: number;
}
