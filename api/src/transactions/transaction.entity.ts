import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: number;

    @Column()
    date: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column()
    cpf: string;

    @Column()
    card: string;

    @Column()
    time: string;

    @Column()
    storeOwner: string;

    @Column()
    storeName: string;
}
