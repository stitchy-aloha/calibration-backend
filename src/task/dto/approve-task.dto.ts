import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive } from 'class-validator';

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
}
