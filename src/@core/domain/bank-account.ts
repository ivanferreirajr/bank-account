import { AccountType } from './interfaces/account-type';

export class BankAccount {
  id: string;
  agency: string;
  account_number: string;
  account_type: AccountType;
  balance: number;

  constructor(
    id: string,
    agency: string,
    account_number: string,
    account_type: AccountType,
    balance: number,
  ) {
    this.id = id;
    this.agency = agency;
    this.account_number = account_number;
    this.account_type = account_type;
    this.balance = balance;
  }

  debit(amount: number): void {
    if (this.balance <= amount) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }

  credit(amount: number): void {
    this.balance += amount;
  }
}
