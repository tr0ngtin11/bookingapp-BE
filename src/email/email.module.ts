import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  // imports: [BullModule.forRoot({})],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
