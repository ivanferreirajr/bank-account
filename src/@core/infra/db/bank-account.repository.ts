import { Repository } from 'typeorm';
import { BankAccountSchema } from './bank-account.schema';
import { BankAccount } from '../../domain/bank-account';
import { BankAccountRepository } from '../../domain/interfaces/bank-account.repository';
import { AccountType } from 'src/@core/domain/interfaces/account-type';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccountSchema>) {}

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(bankAccount);
    await this.ormRepo.insert(model);
  }

  async findByAccountNumber(account_number: string): Promise<BankAccount> {
    const model = await this.ormRepo.findOneBy({
      account_number: account_number,
    });

    return new BankAccount({
      id: model.id,
      agency: model.agency,
      account_number: model.account_number,
      account_type: AccountType[model.account_type],
      balance: model.balance,
    });
  }

  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.update(bankAccount.id, {
      balance: bankAccount.balance,
    });
  }

  async remove(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
