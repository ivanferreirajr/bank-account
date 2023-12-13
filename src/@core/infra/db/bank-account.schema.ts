import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('BankAccount')
export class BankAccountSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', scale: 2 })
  balance: number;

  @Column()
  agency: string;

  @Column()
  account_number: string;

  @Column()
  account_type: string;
}
