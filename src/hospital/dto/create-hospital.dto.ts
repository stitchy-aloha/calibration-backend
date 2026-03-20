import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHospitalDto {
  @ApiProperty({ example: 'โรงพยาบาลส่งเสริมสุขภาพตำบล' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'สาขาบางสะพาน', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '123 ม.1 ต.บางสะพาน อ.บางสะพาน จ.ประจวบคีรีขันธ์',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'บางสะพาน', required: false })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({ example: 'ประจวบคีรีขันธ์', required: false })
  @IsString()
  @IsOptional()
  province?: string;
}
