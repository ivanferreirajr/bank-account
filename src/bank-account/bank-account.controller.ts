import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BankAccountService } from '../@core/domain/bank-account.service';
import { BankAccountsService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('bank-account')
export class BankAccountsController {
  simulationsService: any;
  constructor(
    private readonly bankAccountsService: BankAccountsService,
    private bankAccountService: BankAccountService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a account', tags: ['account'] })
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Create a account', tags: ['account'] })
  findAll() {
    return this.bankAccountsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Create a account', tags: ['account'] })
  findOne(@Param('id') id: string) {
    return this.bankAccountsService.findOne(id);
  }
}
