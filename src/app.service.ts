import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('transcode') private readonly transcodeQueue: Queue,
  ) {}
  // @Cron('*/3 * * * * *')
  @Cron('*/1 * * * *')
  getHello(): void {
    console.log('Hello World!');
  }
  async transcode() {
    await this.transcodeQueue.add({
      fileName: './file.mp3',
    });
  }
}
