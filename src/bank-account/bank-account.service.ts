import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { InjectRepository, getDataSourceToken } from '@nestjs/typeorm';
import {
  CreateBankAccountDto,
  UpdateBankAccountDto,
  TransactionBankAccountDto,
} from './dto';

@Injectable({})
export class BankAccountRestService {
  constructor(
    @InjectRepository(BankAccountSchema)
    private repo: Repository<BankAccountSchema>,
    @Inject(getDataSourceToken())
    private dataSource: DataSource,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.repo.create({
      account_number: String(createBankAccountDto.account_number),
      account_type: createBankAccountDto.account_type,
      agency: String(createBankAccountDto.agency),
    });

    await this.repo.insert(bankAccount);
    return bankAccount;
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.repo.update(id, {
      account_type: updateBankAccountDto.account_type,
      agency: String(updateBankAccountDto.agency),
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const account = await this.repo.findOneBy({ id });
    await this.repo.delete(id);
    return account;
  }

  async credit(transactionBankAccountDto: TransactionBankAccountDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const account = await this.repo.findOneBy({
        account_number: transactionBankAccountDto.account_number,
        agency: transactionBankAccountDto.agency,
      });
      account.balance += transactionBankAccountDto.amount;

      this.repo.save(account);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.error(e);
      throw e;
    }
  }

  async debit(transactionBankAccountDto: TransactionBankAccountDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const account = await this.repo.findOneBy({
        account_number: transactionBankAccountDto.account_number,
        agency: transactionBankAccountDto.agency,
      });

      if (account.balance < transactionBankAccountDto.amount) {
        throw new Error('Insufficient Funds');
      }
      account.balance -= transactionBankAccountDto.amount;

      this.repo.save(account);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.error(e);
      throw e;
    }
  }
}
