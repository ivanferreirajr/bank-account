import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountRestService } from './bank-account.service';

describe('BankAccountsService', () => {
  let service: BankAccountRestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankAccountRestService],
    }).compile();

    service = module.get<BankAccountRestService>(BankAccountRestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
