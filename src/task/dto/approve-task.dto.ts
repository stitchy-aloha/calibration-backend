import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ApproveTaskDto {
  @ApiProperty({ example: 1, description: 'User ID ของผู้ที่ทำการอนุมัติ' })
  @IsInt()
  @IsPositive()
  approver_id: number;

  @ApiProperty({
    enum: ['Approve', 'Reject'],
    example: 'Approve',
    description: 'ผลการตัดสินใจ (อนุมัติ หรือ ตีกลับ)',
  })
  @IsEnum(['Approve', 'Reject'])
  decision: 'Approve' | 'Reject';

  @ApiProperty({
    example: 'Reason for rejection...',
    description: 'หมายเหตุเพิ่มเติม (ถ้ามี)',
    required: false,
  })
  @IsString()
  @IsOptional()
  remarks?: string;
}
