import { Module, Global } from '@nestjs/common';
import { LineService } from './line.service.js';
import { LineController } from './line.controller.js';

@Global()
@Module({
  controllers: [LineController],
  providers: [LineService],
  exports: [LineService],
})
export class LineModule {}
