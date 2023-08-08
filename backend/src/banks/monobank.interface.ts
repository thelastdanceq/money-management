export interface IMonobankUserData {
  clientId: string;
  userId: string;
  name: string;
  webHookUrl: string;
  permissions: string[];
  accounts: IMonobankAccount[];
  jars: IMonobankJar[];
  created: number;
  updated: number;
}

export interface IMonobankAccount {
  id: string;
  sendId: string;
  balance: number;
  creditLimit: number;
  type: 'black' | 'white' | 'platinum' | 'iron' | 'fop' | 'yellow' | 'eAid';
  currencyCode: number;
  cashbackType: 'UAH' | 'Miles' | 'None';
  iban: string;
}

export interface IMonobankJar {
  id: string;
  sendId: string;
  balance: number;
  title: string;
  description: string;
  currencyCode: number;
  goal: number;
}

export interface IMonobankTransaction {
  /**
   * IBAN of the account to which this transaction belongs to
   */
  accountIBAN: string;
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
