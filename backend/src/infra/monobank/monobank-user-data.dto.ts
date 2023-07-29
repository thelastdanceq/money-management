export class MonobankAccountDto {
  id: string;
  sendId: string;
  balance: number;
  creditLimit: number;
  type: 'black' | 'white' | 'platinum' | 'iron' | 'fop' | 'yellow' | 'eAid';
  currencyCode: number;
  cashbackType: 'UAH' | 'Miles' | 'None';
  iban: string;
}

export class MonobankJarDto {
  id: string;
  sendId: string;
  balance: number;
  title: string;
  description: string;
  currencyCode: number;
  goal: number;
}

export class CreateMonobankUserDataDto {
  clientId: string;
  name: string;
  webHookUrl: string;
  permissions: string[];
  accounts: MonobankAccountDto[];
  jars: MonobankJarDto[];
  apiKey: string;
}

export class CreateMonobankTransactionDto {
  id: string;
  time: number;
  description: string;
  mcc: number;
  originalMcc: number;
  hold: boolean;
  amount: number;
  operationAmount: number;
  currencyCode: number;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
  comment: string;
  receiptId: string;
  invoiceId: string;
  counterEdrpou: string;
  counterIban: string;
  counterName: string;
}
