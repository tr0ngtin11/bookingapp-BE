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
  create(createRoomDto: CreateRoomDto) {
    const newRoom = this.roomsRepository.create(createRoomDto);
    return this.roomsRepository.save(newRoom);
  }

  findAll() {
    const rooms = this.roomsRepository.find();
    return rooms;
  }

  findOne(id: number) {
    const room = this.roomsRepository.findOne({ where: { id } });
    return room;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    const res = this.roomsRepository.update(id, updateRoomDto);
    return res;
  }

  remove(id: number) {
    const res = this.roomsRepository.delete(id);
    return res;
  }
}
