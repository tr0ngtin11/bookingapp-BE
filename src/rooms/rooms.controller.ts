import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Header,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Response, Request } from 'express';
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @Res() res: Response) {
    const rooms = await this.roomsService.create(createRoomDto);
    if (!rooms) return new Error('Create room failed');
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json({
      message: 'Create room successfully',
    });
  }

  @Get()
  // @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(@Res() res: Response) {
    try {
      const rooms = await this.roomsService.findAll();
      if (!rooms) return new Error('Get rooms failed');
      res.header('X-Total-Count', rooms.length.toString());
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(rooms);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    try {
      const room = await this.roomsService.findOne(+id);
      if (!room) return new Error('Room not found');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(room);
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @Res() res: Response,
  ) {
    try {
      const room = await this.roomsService.update(+id, updateRoomDto);
      console.log('aaa', room);
      if (!room) return new Error('Update room failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Update room successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    try {
      const room = await this.roomsService.remove(+id);
      if (!room) return new Error('Delete room failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Delete room successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
