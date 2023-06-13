import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    const rooms = await this.roomsService.create(createRoomDto);
    if (!rooms) return new Error('Create room failed');

    return {
      message: 'Create room successfully',
    };
  }

  @Get()
  async findAll() {
    try {
      const rooms = await this.roomsService.findAll();
      if (!rooms) return new Error('Get rooms failed');
      return rooms;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const room = await this.roomsService.findOne(+id);
      if (!room) return new Error('Room not found');
      return room;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    try {
      const room = await this.roomsService.update(+id, updateRoomDto);
      if (!room) return new Error('Update room failed');
      return {
        message: 'Update room successfully',
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const room = await this.roomsService.remove(+id);
      if (!room) return new Error('Delete room failed');
      return {
        message: 'Delete room successfully',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
