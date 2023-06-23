import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  ParseIntPipe,
  UseGuards,
  Query,
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
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const rooms = await this.roomsService.create(createRoomDto);
      if (!rooms) return res.json('Create room failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Create room successfully',
      });
    } catch (error) {
      return res.json('Create room failed');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('perPage') perPage: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const rooms = await this.roomsService.findAll();
      if (!rooms) return res.json('Get rooms failed');
      if (typeof rooms !== 'boolean') {
        res.header('X-Total-Count', rooms.length.toString());
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      }
      if (typeof rooms !== 'boolean' && rooms.length != 0) {
        const totalPage = Math.ceil(rooms.length / limit);
        const start = (perPage - 1) * limit ? (perPage - 1) * limit : 0;
        const end = limit ? (perPage - start) * limit : rooms.length;
        const listRooms = rooms.slice(start, end);
        return res.json({
          rooms: listRooms,
          totalPage,
          currentPage: perPage,
        });
      }
      return res.json(rooms);
    } catch (error) {
      return res.json('Get rooms failed');
    }
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const room = await this.roomsService.findOne(+id);
      if (!room) return res.json('Room not found');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(room);
    } catch (error) {
      return res.json('Get room failed');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const room = await this.roomsService.update(+id, updateRoomDto);
      if (!room) return res.json('Update room failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Update room successfully',
      });
    } catch (error) {
      return res.json('Update room failed');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'room manager')
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const room = await this.roomsService.remove(+id);
      if (!room) return res.json('Delete room failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Delete room successfully',
      });
    } catch (error) {
      return res.json('Delete room failed');
    }
  }
}
