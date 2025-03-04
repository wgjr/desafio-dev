import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TransactionsService} from './transactions.service';
import {TransactionsController} from './transactions.controller';
import {Transaction} from './transactions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransactionsService],
    controllers: [TransactionsController],
    exports: [TransactionsService],
})
export class TransactionsModule {
}
