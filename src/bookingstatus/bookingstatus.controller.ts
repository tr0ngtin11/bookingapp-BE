import { Controller, Body, Patch, Param, Res } from '@nestjs/common';
import { BookingstatusService } from './bookingstatus.service';
import { UpdateBookingstatusDto } from './dto/update-bookingstatus.dto';
import { Response } from 'express';

@Controller('bookingstatus')
export class BookingstatusController {
  constructor(private readonly bookingstatusService: BookingstatusService) {}

  @Patch('invoice/:id')
  update(
    @Param('id') id: string,
    @Body() updateBookingstatusDto: UpdateBookingstatusDto,
    @Res() res: Response,
  ): boolean | Response {
    const updatedStatus = {
      ...updateBookingstatusDto,
      status: 'confirmed',
    };
    const result = this.bookingstatusService.update(+id, updatedStatus);
    if (!result) {
      return res.status(400).json({
        message: 'Update booking status failed',
      });
    }
    return res.status(200).json({
      message: 'Update booking status successfully',
    });
  }
}
