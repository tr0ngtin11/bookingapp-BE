import { Test, TestingModule } from '@nestjs/testing';
import { BookingstatusService } from './bookingstatus.service';

describe('BookingstatusService', () => {
  let service: BookingstatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingstatusService],
    }).compile();

    service = module.get<BookingstatusService>(BookingstatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
