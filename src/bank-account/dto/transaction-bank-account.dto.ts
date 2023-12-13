import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class TransactionBankAccountDto {
  @IsString()
  @ApiProperty()
  account_number: string;

  @IsString()
  @ApiProperty()
  agency: string;

  @IsNumber()
  @ApiProperty()
  amount: number;
}
