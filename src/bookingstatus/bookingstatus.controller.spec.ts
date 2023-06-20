import { Test, TestingModule } from '@nestjs/testing';
import { BookingstatusController } from './bookingstatus.controller';
import { BookingstatusService } from './bookingstatus.service';

describe('BookingstatusController', () => {
  let controller: BookingstatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingstatusController],
      providers: [BookingstatusService],
    }).compile();

    controller = module.get<BookingstatusController>(BookingstatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
