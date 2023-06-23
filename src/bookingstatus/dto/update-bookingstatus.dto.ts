import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingstatusDto } from './create-bookingstatus.dto';

export class UpdateBookingstatusDto extends PartialType(
  CreateBookingstatusDto,
) {}
