import { Controller, Body, Patch, Param, Res } from '@nestjs/common';
import { BookingstatusService } from './bookingstatus.service';
import { UpdateBookingstatusDto } from './dto/update-bookingstatus.dto';
import { Response } from 'express';
import { async } from 'rxjs';

@Controller('bookingstatus')
export class BookingstatusController {
  constructor(private readonly bookingstatusService: BookingstatusService) {}

  @Patch('invoice/:id')
  update(
    @Param('id') id: string,
    @Body() updateBookingstatusDto: UpdateBookingstatusDto,
    @Res() res: Response,
  ): Promise<boolean | Response> {
    const updatedStatus = {
      ...updateBookingstatusDto,
      status: 'confirmed',
    };
    const result = await this.bookingstatusService.update(+id, updatedStatus);
    if (!result) {
      return res.status(400).json({
        message: 'Update booking status failed',
      });
    }
    console.log('a', result);
    return res.json(result);
  }
}
