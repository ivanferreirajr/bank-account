import { Inject, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { Repository, DataSource } from 'typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { InjectRepository, getDataSourceToken } from '@nestjs/typeorm';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

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
}
