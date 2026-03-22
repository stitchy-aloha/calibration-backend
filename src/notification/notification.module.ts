import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './notification.service.js';
import { NotificationController } from './notification.controller.js';
import { Equipment } from '../equipment/equipment.entity.js';
import { Task } from '../task/task.entity.js';
import { LineModule } from '../line/line.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, Task]), LineModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
