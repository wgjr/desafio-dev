import {Controller, Post, UseInterceptors, UploadedFile, UseGuards, Get, Query} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {TransactionsService} from './transactions.service';
import {JwtAuthGuard} from "../auth/auth.guard";

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const content = file.buffer.toString('utf-8');
        const lines = content.split('\n');
        const errors: { line: string, reason: string }[] = [];

        for (const line of lines) {
            if (!line.trim()) continue;

            const transaction = {
                type: parseInt(line.slice(0, 1)),
                date: line.slice(1, 9),
                amount: parseFloat(line.slice(9, 19)) / 100,
                cpf: line.slice(19, 30),
                card: line.slice(30, 42),
                time: line.slice(42, 48),
                storeOwner: line.slice(48, 62).trim(),
                storeName: line.slice(62, 81).trim(),
            };

            if (
                isNaN(transaction.type) ||
                !/^\d{8}$/.test(transaction.date) ||
                isNaN(transaction.amount) ||
                !/^\d{11}$/.test(transaction.cpf) ||
                !transaction.card.trim() ||
                !/^\d{6}$/.test(transaction.time) ||
                !transaction.storeOwner ||
                !transaction.storeName
            ) {
                errors.push({line, reason: 'Invalid or missing field'});
                continue;
            }

            try {
                await this.transactionsService.createTransaction(transaction);
            } catch (error) {
                errors.push({line, reason: 'Database error'});
            }
        }

        return {
            message: 'File processed successfully',
            errors: errors.length ? errors : null,
        };
    }


    @Get('list/store')
    async transactionListBy(@Query('store_name') store_name) {
        const transactions = await this.transactionsService.listByShop(store_name)

        if (!transactions){
            return {
                message: 'Register not found by store',
            };
        }

        let balance = transactions.reduce((acc, transaction) => {
            const isCredit = [1, 4, 5, 6, 7, 8].includes(transaction.type);

            const value = typeof transaction.amount === 'string' ? parseFloat(transaction.amount) : transaction.amount;

            if (isNaN(value)) {
                console.error(`Invalid value detected: ${transaction.amount}`);
                return acc;
            }

            return acc + (isCredit ? value : -value);
        }, 0);

        const formattedBalance = balance.toFixed(2);

        return {
            message: 'Register found',
            data: transactions,
            total_amount: formattedBalance
        }
    }
}