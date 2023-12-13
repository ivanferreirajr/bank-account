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
import { BankAccountRestService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-account')
export class BankAccountsController {
  simulationsService: any;
  constructor(
    private readonly bankAccountRestService: BankAccountRestService,
    private bankAccountService: BankAccountService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a account', tags: ['account'] })
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(
      createBankAccountDto.agency,
      createBankAccountDto.account_number,
      createBankAccountDto.account_type,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Create a account', tags: ['account'] })
  findAll() {
    return this.bankAccountRestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Create a account', tags: ['account'] })
  findOne(@Param('id') id: string) {
    return this.bankAccountRestService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a account', tags: ['account'] })
  async update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const bankAccount = await this.bankAccountRestService.update(
      id,
      updateBankAccountDto,
    );

    if (!bankAccount) {
      throw new NotFoundException("This account doesn't exist");
    }

    return bankAccount;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a account', tags: ['account'] })
  remove(@Param('id') id: string) {
    return this.bankAccountRestService.remove(id);
  }
}
