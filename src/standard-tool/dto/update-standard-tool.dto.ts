import { PartialType } from '@nestjs/swagger';
import { CreateStandardToolDto } from './create-standard-tool.dto.js';

export class UpdateStandardToolDto extends PartialType(CreateStandardToolDto) {}
