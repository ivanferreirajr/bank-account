import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { AccountType } from 'src/@core/domain/interfaces/account-type';

export class CreateBankAccountDto {
  @IsNumber()
  @ApiProperty()
  account_number: number;

  @IsString()
  @IsEnum(AccountType)
  @ApiProperty()
  account_type: string;

  @IsNumber()
  @ApiProperty()
  agency: number;
}
