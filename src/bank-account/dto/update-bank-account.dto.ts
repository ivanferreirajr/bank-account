import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateBankAccountDto {
  @IsString()
  @ApiProperty()
  account_type?: string;

  @IsNumber()
  @ApiProperty()
  agency?: number;
}
