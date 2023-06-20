import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { BookingstatusService } from './bookingstatus.service';
import { CreateBookingstatusDto } from './dto/create-bookingstatus.dto';
import { UpdateBookingstatusDto } from './dto/update-bookingstatus.dto';
import { Response } from 'express';

@Controller('bookingstatus')
export class BookingstatusController {
  constructor(private readonly bookingstatusService: BookingstatusService) {}

  @Post()
  create(@Body() createBookingstatusDto: CreateBookingstatusDto) {
    return this.bookingstatusService.create(createBookingstatusDto);
  }

  @Get()
  findAll() {
    return this.bookingstatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingstatusService.findOne(+id);
  }

  @Patch('invoice/:id')
  update(
    @Param('id') id: string,
    @Body() updateBookingstatusDto: UpdateBookingstatusDto,
    @Res() res: Response,
  ) {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingstatusService.remove(+id);
  }
}
