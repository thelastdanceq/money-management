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
        { apiKey: createMonobankUserDataDto.apiKey },
        createMonobankUserDataDto,
        { upsert: true },
      )
      .exec();
  }

  async findOne(apiKey: string): Promise<IMonobankUserData> {
    return this.monobankUserDataModel.findOne({ apiKey: apiKey }).exec();
  }

  async findAll(): Promise<IMonobankUserData[]> {
    return this.monobankUserDataModel.find().exec();
  }
}
