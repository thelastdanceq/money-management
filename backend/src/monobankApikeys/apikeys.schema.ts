import { Schema, Document } from 'mongoose';

export interface IApiKey {
  userId: string;
  key: string;
}

export const ApiKeySchema = new Schema<IApiKey>({
  userId: { type: String, required: true },
  key: { type: String, required: true },
});
