import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: number;

    @Column()
    date: string;

    @Column({ type: 'decimal' })
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
