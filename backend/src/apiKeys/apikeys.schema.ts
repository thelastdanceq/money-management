import { Schema, Document } from 'mongoose';

export enum ApiKeyTypes {
  BINANCE_API_KEY = 'BINANCE_API_KEY',
  BINANCE_SECRET_KEY = 'BINANCE_SECRET_KEY',
  MONOBANK = 'MONOBANK',
}

export interface IApiKey {
  userId: string;
  key: string;
  type: ApiKeyTypes;
}

export const ApiKeySchema = new Schema<IApiKey>({
  userId: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, required: true },
});
