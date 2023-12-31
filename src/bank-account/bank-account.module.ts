import { Module } from '@nestjs/common';
import { BankAccountController } from './bank-account.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { BankAccountService } from '../@core/domain/bank-account.service';
import { BankAccountRestService } from './bank-account.service';
import { DataSource } from 'typeorm';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/bank-account.repository';
import { BankAccountRepository } from '../@core/domain/interfaces/bank-account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchema])],
  controllers: [BankAccountController],
  providers: [
    BankAccountRestService,
    {
      provide: BankAccountTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new BankAccountTypeOrmRepository(
          dataSource.getRepository(BankAccountSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountService,
      useFactory: (repo: BankAccountRepository) => {
        return new BankAccountService(repo);
      },
      inject: [BankAccountTypeOrmRepository],
    },
  ],
})
export class BankAccountsModule {}
