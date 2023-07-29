import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IApiKey } from './apikeys.schema';

@Injectable()
export class ApiKeysService {
  constructor(@InjectModel('ApiKey') private apiKeyModel: Model<IApiKey>) {}

  async create(userId: string, key: string): Promise<IApiKey> {
    const newApiKey = new this.apiKeyModel({ userId, key });
    return newApiKey.save();
  }

  async findByUserId(userId: string) {
    return this.apiKeyModel.findOne({ userId }).exec();
  }
}
