import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('transcode')
export class TranscodeConsumer {
  private readonly logger = new Logger(TranscodeConsumer.name);
  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log(`Transcoding message: ${job.id}`);
    this.logger.debug('Data:', job.data);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log(`Transcoding complete for job: ${job.id}`);
  }
}
