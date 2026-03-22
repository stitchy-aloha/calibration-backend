import { Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service.js';
import { Public } from '../auth/decorators/public.decorator.js';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Public()
  @Post('test-due-7-days')
  async triggerTest() {
    await this.notificationService.handleCalibrationDueNotifications();
    return { message: 'Notification check triggered manually' };
  }
}
