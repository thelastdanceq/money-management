import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMonobankTransaction } from '../../banks/monobank.interface';
import { CreateMonobankTransactionDto } from './monobank-user-data.dto';

@Injectable()
export class MonobankTransactionService {
  constructor(
    @InjectModel('MonobankTransaction')
    private readonly monobankTransactionModel: Model<IMonobankTransaction>,
  ) {}

  async createMany(
    createMonobankTransactionDto: CreateMonobankTransactionDto[],
  ): Promise<IMonobankTransaction[]> {
    return this.monobankTransactionModel.insertMany(
      createMonobankTransactionDto,
    );
  }

  async createOrUpdateMany(
    createMonobankTransactionDto: CreateMonobankTransactionDto[],
  ): Promise<boolean> {
    const operations = createMonobankTransactionDto.map((transaction) => ({
      updateOne: {
        filter: { id: transaction.id },
        update: transaction,
        upsert: true,
      },
    }));

    const res = await this.monobankTransactionModel.bulkWrite(operations);

    return res.matchedCount === createMonobankTransactionDto.length;
  }

  async create(
    createMonobankTransactionDto: CreateMonobankTransactionDto,
  ): Promise<IMonobankTransaction> {
    const createdMonobankTransaction = new this.monobankTransactionModel(
      createMonobankTransactionDto,
    );
    return createdMonobankTransaction.save();
  }

  async findAll(): Promise<IMonobankTransaction[]> {
    return this.monobankTransactionModel.find().exec();
  }

  async findByApiKey(apiKey: string): Promise<IMonobankTransaction[]> {
    return this.monobankTransactionModel.find({ apiKey }).exec();
  }
}
