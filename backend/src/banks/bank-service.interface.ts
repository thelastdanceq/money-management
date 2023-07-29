export interface IBankService<AccountData, Transaction> {
  fetchAccountData(apiKey: string): Promise<AccountData>;
  fetchTransactionHistory(
    apiKey: string,
    accountId: string,
    from: number,
    to?: number,
  ): Promise<Transaction[]>;
}
