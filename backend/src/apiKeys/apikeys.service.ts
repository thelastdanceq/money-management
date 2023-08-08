import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiKeyTypes, IApiKey } from './apikeys.schema';

@Injectable()
export class ApiKeysService {
  constructor(@InjectModel('ApiKey') private apiKeyModel: Model<IApiKey>) {}

  async create(
    userId: string,
    key: string,
    type: ApiKeyTypes,
  ): Promise<IApiKey> {
    const newApiKey = new this.apiKeyModel({ userId, key, type });
    return newApiKey.save();
  }

  async findByUserId(userId: string, type: ApiKeyTypes) {
    return await this.apiKeyModel.findOne({ userId, type }).exec();
  }

  async findByApiKey(apiKey: string, type: ApiKeyTypes) {
    return await this.apiKeyModel.findOne({ key: apiKey, type }).exec();
  }
}
