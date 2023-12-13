import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('BankAccount')
export class BankAccountSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', scale: 2 })
  balance: number;

  @Column()
  agency: string;

  @Column()
  @Index({ unique: true })
  account_number: string;

  @Column()
  account_type: string;

  @CreateDateColumn({
    type: 'datetime',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    nullable: true,
  })
  updated_at?: Date;
}
