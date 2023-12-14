import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  HttpCode,
  Patch,
  InternalServerErrorException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BankAccountService } from '../@core/domain/bank-account.service';
import { BankAccountRestService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { TransactionBankAccountDto } from './dto/transaction-bank-account.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('bank-account')
export class BankAccountController {
  simulationsService: any;
  constructor(
    private readonly bankAccountRestService: BankAccountRestService,
    private bankAccountService: BankAccountService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar conta', tags: ['Conta'] })
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(
      createBankAccountDto.agency,
      createBankAccountDto.account_number,
      createBankAccountDto.account_type,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as contas', tags: ['Conta'] })
  findAll() {
    return this.bankAccountRestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista conta por id', tags: ['Conta'] })
  findOne(@Param('id') id: string) {
    return this.bankAccountRestService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados da conta', tags: ['Conta'] })
  async update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const bankAccount = await this.bankAccountRestService.update(
      id,
      updateBankAccountDto,
    );

    if (!bankAccount) {
      throw new NotFoundException('Conta não encontrada');
    }

    return bankAccount;
  }

  @HttpCode(204)
  @Patch('debit')
  @ApiOperation({ summary: 'Fazer saque de uma conta', tags: ['Conta'] })
  async debit(@Body() transactionBankAccountDto: TransactionBankAccountDto) {
    try {
      return this.bankAccountService.debit(
        transactionBankAccountDto.account_number,
        transactionBankAccountDto.agency,
        transactionBankAccountDto.amount,
      );
    } catch (err) {
      if (err.message === 'Insufficient Funds') {
        throw new HttpException(
          'Conta não tem saldo suficiente',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new InternalServerErrorException('Valor não debitado da conta');
    }
  }

  @HttpCode(204)
  @Patch('credit')
  @ApiOperation({ summary: 'Fazer depósito em uma conta', tags: ['Conta'] })
  async credit(@Body() transactionBankAccountDto: TransactionBankAccountDto) {
    try {
      return this.bankAccountService.credit(
        transactionBankAccountDto.account_number,
        transactionBankAccountDto.agency,
        transactionBankAccountDto.amount,
      );
    } catch (err) {
      throw new InternalServerErrorException('Valor não creditado na conta');
    }
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar conta por id', tags: ['Conta'] })
  remove(@Param('id') id: string) {
    return this.bankAccountRestService.remove(id);
  }
}
