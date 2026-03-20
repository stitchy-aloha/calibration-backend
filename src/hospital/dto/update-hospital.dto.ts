import { PartialType } from '@nestjs/swagger';
import { CreateHospitalDto } from './create-hospital.dto.js';

/**
 * DTO for updating a hospital
 */
export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {}
