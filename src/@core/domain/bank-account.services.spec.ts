import { DataSource, Repository } from 'typeorm';
import { BankAccountTypeOrmRepository } from '../infra/db/bank-account.repository';
import { BankAccountSchema } from '../infra/db/bank-account.schema';
import { BankAccountService } from './bank-account.service';
import { AccountType } from './interfaces/account-type';

type sutFactoryReturn = {
  dataSource: DataSource;
  ormRepo: Repository<BankAccountSchema>;
  repository: BankAccountTypeOrmRepository;
  bankAccountService: BankAccountService;
};

async function sutFactory(): Promise<sutFactoryReturn> {
  const dataSource: DataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: true,
    entities: [BankAccountSchema],
  });
  await dataSource.initialize();
  const ormRepo: Repository<BankAccountSchema> =
    dataSource.getRepository(BankAccountSchema);
  const repository: BankAccountTypeOrmRepository =
    new BankAccountTypeOrmRepository(ormRepo);
  const bankAccountService: BankAccountService = new BankAccountService(
    repository,
  );

  return {
    dataSource,
    ormRepo,
    repository,
    bankAccountService,
  };
}

describe('BankAccountService', () => {
  it('should create a new bank account', async () => {
    const { ormRepo, bankAccountService } = await sutFactory();
    await bankAccountService.create(
      '3030',
      '1111-11',
      AccountType['CORRENTE'],
      50,
    );
    const model = await ormRepo.findOneBy({ account_number: '1111-11' });
    expect(model.agency).toBe('3030');
    expect(model.balance).toBe(50);
    expect(model.account_number).toBe('1111-11');
  });
});
