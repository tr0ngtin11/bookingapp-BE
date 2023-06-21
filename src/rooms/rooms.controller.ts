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
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @Res() res: Response) {
    try {
      const rooms = await this.roomsService.create(createRoomDto);
      if (!rooms) return new Error('Create room failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Create room successfully',
      });
    } catch (error) {
      return new Error('Create room failed');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const rooms = await this.roomsService.findAll();
      if (!rooms) return new Error('Get rooms failed');
      res.header('X-Total-Count', rooms.length.toString());
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(rooms);
    } catch (error) {
      return new Error('Get rooms failed');
    }
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    try {
      const room = await this.roomsService.findOne(+id);
      if (!room) return new Error('Room not found');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(room);
    } catch (error) {
      return new Error('Get room failed');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @Res() res: Response,
  ) {
    try {
      const room = await this.roomsService.update(+id, updateRoomDto);
      if (!room) return new Error('Update room failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Update room successfully',
      });
    } catch (error) {
      return new Error('Update room failed');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
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
      return new Error('Delete room failed');
    }
  }
}
