import { BankAccount } from './bank-account';
import { AccountType } from './interfaces/account-type';
import { BankAccountRepository } from './interfaces/bank-account.repository';

export class BankAccountService {
  constructor(private bankAccountRepo: BankAccountRepository) {}

  async create(
    agency: string,
    account_number: string,
    account_type: AccountType,
    balance: number,
  ) {
    const bankAccount = new BankAccount({
      agency,
      account_number,
      account_type,
      balance,
    });
    await this.bankAccountRepo.insert(bankAccount);
    return bankAccount;
  }
}
