import { Schema } from 'mongoose';
import {
  IMonobankAccount,
  IMonobankJar,
  IMonobankTransaction,
  IMonobankUserData,
} from '../../banks/monobank.interface';

export const MonobankAccountSchema = new Schema<IMonobankAccount>({
  id: String,
  sendId: String,
  balance: Number,
  creditLimit: Number,
  type: String,
  currencyCode: Number,
  cashbackType: String,
  iban: String,
});

export const MonobankJarSchema = new Schema<IMonobankJar>({
  id: String,
  sendId: String,
  balance: Number,
  title: String,
  description: String,
  currencyCode: Number,
  goal: Number,
});

export const MonobankUserDataSchema = new Schema<IMonobankUserData>({
  clientId: String,
  name: String,
  webHookUrl: String,
  permissions: [String],
  accounts: [MonobankAccountSchema],
  jars: [MonobankJarSchema],
  apiKey: String,
});

export const MonobankTransactionSchema = new Schema<IMonobankTransaction>({
  id: String,
  time: Number,
  description: String,
  mcc: Number,
  originalMcc: Number,
  hold: Boolean,
  amount: Number,
  operationAmount: Number,
  currencyCode: Number,
  commissionRate: Number,
  cashbackAmount: Number,
  balance: Number,
  comment: String,
  receiptId: String,
  invoiceId: String,
  counterEdrpou: String,
  counterIban: String,
  counterName: String,
  apiKey: String,
});
