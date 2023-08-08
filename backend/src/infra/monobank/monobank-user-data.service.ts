import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMonobankUserData } from '../../banks/monobank.interface';
import { CreateMonobankUserDataDto } from './monobank-user-data.dto';

@Injectable()
export class MonobankUserDataService {
  constructor(
    @InjectModel('MonobankUserData')
    private readonly monobankUserDataModel: Model<IMonobankUserData>,
  ) {}

  async create(
    createMonobankUserDataDto: CreateMonobankUserDataDto,
  ): Promise<IMonobankUserData> {
    return this.monobankUserDataModel.create(createMonobankUserDataDto);
  }

  async createOrUpdate(
    createMonobankUserDataDto: CreateMonobankUserDataDto,
  ): Promise<IMonobankUserData> {
    return this.monobankUserDataModel
      .findOneAndUpdate(
        { userId: createMonobankUserDataDto.userId },
        createMonobankUserDataDto,
        { upsert: true },
      )
      .exec();
  }

  async findOne(userId: string): Promise<IMonobankUserData> {
    return this.monobankUserDataModel.findOne({ userId }).exec();
  }

  async findAll(): Promise<IMonobankUserData[]> {
    return this.monobankUserDataModel.find().exec();
  }
}
