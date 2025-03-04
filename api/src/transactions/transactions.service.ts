import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Transaction} from './transaction.entity';
import {Repository} from "typeorm";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
    ) {
    }

    async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
        const transaction = this.transactionsRepository.create(data);
        return this.transactionsRepository.save(transaction);
    }

    async listByShop(shopName): Promise<Transaction[]> {
        return this.transactionsRepository.findBy({
            storeName: shopName
        })
    }
}
