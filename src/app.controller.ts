import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): void {
    this.appService.getHello();
  }
  @Post()
  async transcode(): Promise<void> {
    return this.appService.transcode();
  }
}
