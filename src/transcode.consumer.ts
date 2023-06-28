import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Repository } from 'typeorm';
@Processor('transcode')
export class TranscodeConsumer {
  private readonly logger = new Logger(TranscodeConsumer.name);
  @Process()
  async transcode(job: Job<unknown>): Promise<void> {
    this.logger.log(`Transcoding message: ${job.id}`);
    this.logger.debug('Data:', job.data);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log(`Transcoding complete for job: ${job.id}`);
  }
}

// @Cron('*/3 * * * * *') but rewrite to 1 minute
// @Cron('*/10 * * * *')
@Processor('users')
@Injectable()
export class UsersConsumer {
  private readonly logger = new Logger(UsersConsumer.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  @Process()
  async createUser(job: Job<{ newUser: User }>): Promise<void> {
    const { newUser } = job.data;
    console.log('user', newUser);
    try {
      // Xử lý công việc tạo người dùng ở đây
      await this.usersRepository.create(newUser);
      await this.usersRepository.save(newUser);
      console.log('Người dùng mới đã được tạo và lưu vào cơ sở dữ liệu.');
    } catch (error) {
      console.error('Lỗi trong quá trình tạo người dùng:', error);
      throw error;
    }
  }
}
