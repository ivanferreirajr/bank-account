import { BankAccount } from './bank-account';
import { AccountType } from './interfaces/account-type';

function accountSutFactory(): BankAccount {
  const bankAccount = new BankAccount(
    '5050',
    '12345',
    AccountType.CORRENTE,
    50,
    '123',
  );

  return bankAccount;
}

describe('BankAccount', () => {
  it('should create a bank account', () => {
    const bankAccount = accountSutFactory();

    expect(bankAccount.id).toBe('123');
    expect(bankAccount.balance).toBe(50);
    expect(bankAccount.agency).toBe('5050');
    expect(bankAccount.account_number).toBe('12345');
    expect(bankAccount.account_type).toBe(AccountType.CORRENTE);
  });

  it('should make an debit in the account', () => {
    const bankAccount = accountSutFactory();

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

  it('should credit the account', () => {
    const bankAccount = accountSutFactory();

    bankAccount.credit(50);

    expect(bankAccount.balance).toBe(100);
  });
});
