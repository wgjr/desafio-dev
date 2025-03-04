import { Test, TestingModule } from '@nestjs/testing';
import {TransactionsController} from "../transactions/transactions.controller";
import {TransactionsService} from "../transactions/transactions.service";
import { JwtAuthGuard } from '../auth/auth.guard';
import { getMockRes } from '@jest-mock/express';
import * as multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

describe('TransactionsController', () => {
    let transactionsController: TransactionsController;
    let transactionsService: TransactionsService;

    beforeEach(async () => {
        const transactionsServiceMock = {
            createTransaction: jest.fn().mockResolvedValue(true),
            listByShop: jest.fn().mockResolvedValue([
                {
                    type: 1,
                    date: '20230101',
                    amount: 100.0,
                    cpf: '12345678901',
                    card: '123456789012',
                    time: '123456',
                    storeOwner: 'OwnerName',
                    storeName: 'StoreName',
                },
            ]),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionsController],
            providers: [
                {
                    provide: TransactionsService,
                    useValue: transactionsServiceMock,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard) // Bypass the JwtAuthGuard
            .useValue({ canActivate: () => true })
            .compile();

        transactionsController = module.get<TransactionsController>(TransactionsController);
        transactionsService = module.get<TransactionsService>(TransactionsService);
    });

    describe('uploadFile', () => {
        it('should process the file and return the result', async () => {
            const file = {
                buffer: Buffer.from('3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO\n'),
            };

            const result = await transactionsController.uploadFile(file as Express.Multer.File);

            expect(transactionsService.createTransaction).toHaveBeenCalled();
            expect(result.message).toBe('File processed successfully');
            expect(result.errors).toBeNull();
        });

        it('should return errors for invalid lines', async () => {
            const file = {
                buffer: Buffer.from('invalid data\n'),
            };

            const result = await transactionsController.uploadFile(file as Express.Multer.File);

            expect(result.message).toBe('File processed successfully');
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].reason).toBe('Invalid or missing field');
        });
    });

    describe('transactionListBy', () => {
        it('should return the transactions and balance for a store', async () => {
            const store_name = 'StoreName';
            const result = await transactionsController.transactionListBy(store_name);

            expect(transactionsService.listByShop).toHaveBeenCalledWith(store_name);
            expect(result.message).toBe('Register found');
            expect(result.data).toBeDefined();
            expect(result.total_amount).toBe('100.00');
        });

        it('should return a message when no transactions are found', async () => {
            transactionsService.listByShop = jest.fn().mockResolvedValue(null);

            const store_name = 'NonExistingStore';
            const result = await transactionsController.transactionListBy(store_name);

            expect(result.message).toBe('Register not found by store');
        });
    });
});
