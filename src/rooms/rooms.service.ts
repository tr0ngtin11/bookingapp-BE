import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from 'src/typeorm/entities/Room';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}
  async create(createRoomDto: CreateRoomDto): Promise<boolean> {
    try {
      const newRoom = await this.roomsRepository.create(createRoomDto);
      await this.roomsRepository.save(newRoom);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findAll(): Promise<Room[] | boolean> {
    try {
      const rooms: Room[] = await this.roomsRepository.find();
      if (!rooms) return false;
      return rooms;
    } catch (error) {
      return false;
    }
  }

  async findOne(id: number): Promise<Room | boolean> {
    try {
      const room: Room = await this.roomsRepository.findOne({ where: { id } });
      if (!room) return false;
      return room;
    } catch (error) {
      return false;
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<boolean> {
    try {
      const res = await this.roomsRepository.update(id, updateRoomDto);
      if (res.affected === 0) return false;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const res = await this.roomsRepository.delete(id);
      if (res.affected === 0) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}
