import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { AccountType } from '../../@core/domain/interfaces/account-type';

export class UpdateBankAccountDto {
  @IsString()
  @IsEnum(AccountType)
  @ApiProperty()
  account_type?: string;

  @IsNumber()
  @ApiProperty()
  agency?: number;
}
