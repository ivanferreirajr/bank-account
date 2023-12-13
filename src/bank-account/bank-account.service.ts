import { Inject, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { Repository, DataSource } from 'typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { InjectRepository, getDataSourceToken } from '@nestjs/typeorm';

@Injectable({})
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccountSchema)
    private repo: Repository<BankAccountSchema>,
    @Inject(getDataSourceToken())
    private dataSource: DataSource,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.repo.create({
      agency: createBankAccountDto.agency,
      account_number: createBankAccountDto.account_number,
      account_type: createBankAccountDto.account_type,
      balance: 0,
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
}
