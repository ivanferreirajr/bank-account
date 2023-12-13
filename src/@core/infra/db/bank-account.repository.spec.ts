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
    const bankAccount = new BankAccount(
      '5050',
      '12345',
      AccountType.POUPANCA,
      50,
    );
    const { repository, ormRepo } = await sutFactory();
    await repository.insert(bankAccount);
    const model = await ormRepo.findOneBy({ account_number: '1111-11' });

    expect(model.id).toBe(bankAccount.id);
    expect(model.balance).toBe(50);
    expect(model.agency).toBe('5050');
    expect(model.account_number).toBe('12345');
    expect(model.account_type).toBe(AccountType.POUPANCA);
  });
});
