import { BankAccount } from './bank-account';
import { AccountType } from './interfaces/account-type';

function accountSutFactory(): BankAccount {
  const bankAccount = new BankAccount({
    agency: '5050',
    account_number: '12345',
    account_type: AccountType.CORRENTE,
  });
  return bankAccount;
}

describe('BankAccount', () => {
  it('should create a bank account', () => {
    const bankAccount = accountSutFactory();

    expect(bankAccount.id).toBeDefined();
    expect(bankAccount.balance).toBe(0);
    expect(bankAccount.agency).toBe('5050');
    expect(bankAccount.account_number).toBe('12345');
    expect(bankAccount.account_type).toBe(AccountType.CORRENTE);
  });

  it('should credit the account', () => {
    const bankAccount = accountSutFactory();

    bankAccount.credit(50);

    expect(bankAccount.balance).toBe(50);
  });

  it('should make an debit in the account', () => {
    const bankAccount = accountSutFactory();
    bankAccount.credit(50);

    bankAccount.debit(25);

    expect(bankAccount.balance).toBe(25);
  });

  it('should not able to debit in account', () => {
    const bankAccount = accountSutFactory();

    const executeDebit = () => {
      bankAccount.debit(100);
    };

    expect(executeDebit).toThrow('Insufficient funds');
  });
});
