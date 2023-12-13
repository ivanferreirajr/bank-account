import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBankAccountDto {
  @IsNumber()
  @ApiProperty()
  account_number: number;

  @IsString()
  @ApiProperty()
  account_type: string;

  @IsNumber()
  @ApiProperty()
  agency: number;
}
