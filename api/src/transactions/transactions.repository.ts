import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

export class TransactionsRepository extends Repository<Transaction> {}
