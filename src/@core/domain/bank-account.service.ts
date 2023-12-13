import { BankAccount } from './bank-account';
import { AccountType } from './interfaces/account-type';
import { BankAccountRepository } from './interfaces/bank-account.repository';

export class BankAccountService {
  constructor(private bankAccountRepo: BankAccountRepository) {}

  async create(agency: number, account_number: number, account_type: string) {
    const bankAccount = new BankAccount({
      agency: String(agency),
      account_number: String(account_number),
      account_type: AccountType[account_type],
    });
    await this.bankAccountRepo.insert(bankAccount);
    return bankAccount;
  }

  async credit(account_number: string, agency: string, amount: number) {
    const bankAccount =
      await this.bankAccountRepo.findByAccountNumber(account_number);

    bankAccount.credit(amount);

    await this.bankAccountRepo.update(bankAccount);
  }

  async debit(account_number: string, agency: string, amount: number) {
    const bankAccount =
      await this.bankAccountRepo.findByAccountNumber(account_number);

    bankAccount.debit(amount);

    await this.bankAccountRepo.update(bankAccount);
  }
}
