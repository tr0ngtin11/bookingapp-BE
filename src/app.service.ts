import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('transcode') private readonly transcodeQueue: Queue,
  ) {}

  async transcode(): Promise<void> {
    await this.transcodeQueue.add({
      fileName: './file.mp3',
    });
  }
}
