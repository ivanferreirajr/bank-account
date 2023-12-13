import { v4 as uuid } from 'uuid';
import { AccountType } from './interfaces/account-type';

export type BankAccountProps = {
  id?: string;
  agency: string;
  account_number: string;
  account_type: AccountType;
  balance?: number;
};

export class BankAccount {
  id: string;
  agency: string;
  account_number: string;
  account_type: AccountType;
  balance: number;

  constructor(bankAccountProps: BankAccountProps) {
    this.id = bankAccountProps.id ?? uuid();
    this.agency = bankAccountProps.agency;
    this.account_number = bankAccountProps.account_number;
    this.account_type = bankAccountProps.account_type;
    this.balance = 0;
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
