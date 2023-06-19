import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from 'src/typeorm/entities/Room';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}
  async create(createRoomDto: CreateRoomDto) {
    try {
      const newRoom = await this.roomsRepository.create(createRoomDto);
      await this.roomsRepository.save(newRoom);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findAll() {
    try {
      const rooms = await this.roomsRepository.find();
      return rooms;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findOne(id: number) {
    try {
      const room = await this.roomsRepository.findOne({ where: { id } });
      return room;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      await this.roomsRepository.update(id, updateRoomDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async remove(id: number) {
    try {
      await this.roomsRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return false; 
    }
  }
}
