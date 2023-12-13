import { DataSource, Repository } from 'typeorm';
import { BankAccount } from '../../domain/bank-account';
import { BankAccountTypeOrmRepository } from './bank-account.repository';
import { BankAccountSchema } from './bank-account.schema';
import { AccountType } from 'src/@core/domain/interfaces/account-type';

type sutFactoryReturn = {
  dataSource: DataSource;
  ormRepo: Repository<BankAccountSchema>;
  repository: BankAccountTypeOrmRepository;
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

  return {
    dataSource,
    ormRepo,
    repository,
  };
}

describe('BankAccount Repository', () => {
  it('should insert a new account', async () => {
    const { repository, ormRepo } = await sutFactory();
    const bankAccount = new BankAccount({
      id: '123',
      agency: '5050',
      account_number: '12345',
      account_type: AccountType.CORRENTE,
      balance: 50,
    });

    await repository.insert(bankAccount);
    const model = await ormRepo.findOneBy({ account_number: '1111-11' });

    expect(model.id).toBe(bankAccount.id);
    expect(model.balance).toBe(50);
    expect(model.agency).toBe('5050');
    expect(model.account_number).toBe('12345');
    expect(model.account_type).toBe(AccountType.POUPANCA);
  });
});
