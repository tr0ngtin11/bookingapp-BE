import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  // imports: [BullModule.forRoot({})],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
