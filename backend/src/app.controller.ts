import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MonobankService } from './banks/monobank.service';
import { MonobankUserDataService } from './infra/monobank/monobank-user-data.service';
import { MonobankTransactionService } from './infra/monobank/monobank-transaction.service';
import {
  IMonobankAccount,
  IMonobankTransaction,
} from './banks/monobank.interface';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeysService } from './monobankApikeys/apikeys.service';
import { BinanceService } from './crypto/binance/binance.service';

@Controller()
export class AppController {
  constructor(
    private monoBankService: MonobankService,
    private readonly monobankUserDataService: MonobankUserDataService,
    private readonly monobankTransactionService: MonobankTransactionService,
    private readonly apikeysService: ApiKeysService,
    private readonly binanceService: BinanceService,
  ) {}

  @Get('/get-user-data')
  @UseGuards(AuthGuard('jwt'))
  async getUserData(@Req() req): Promise<any> {
    const userId = req.user.userId;
    const apiKey = await this.apikeysService.findByUserId(userId);
    if (!apiKey) {
      throw new HttpException('Api key not found', HttpStatus.NOT_FOUND);
    }
    try {
      const data = await this.monoBankService.fetchAccountData(apiKey.key);
      this.monobankUserDataService.createOrUpdate({ ...data, userId });
      return data;
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.TOO_MANY_REQUESTS
      ) {
        return await this.monobankUserDataService.findOne(userId);
      } else {
        throw e;
      }
    }
  }

  @Get('/get-binance-user-data')
  async getBinanceUserData(): Promise<any> {
    return this.binanceService.getUserData();
  }

  @Post('/get-user-transactions')
  @UseGuards(AuthGuard('jwt'))
  async getUserTransactions(
    @Req() req,
    @Body() body: { accountId: string; from: number; to?: number },
  ): Promise<IMonobankTransaction[]> {
    const userId = req.user.userId;
    const apiKey = await this.apikeysService.findByUserId(userId);
    if (!apiKey) {
      throw new HttpException('Api key not found', HttpStatus.NOT_FOUND);
    }
    const userData = await this.monobankUserDataService.findOne(userId);
    const account = userData.accounts.find(
      (account) => account.id === body.accountId,
    );
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    try {
      const data = await this.monoBankService.fetchTransactionHistory(
        apiKey.key,
        body.accountId,
        body.from,
        body.to,
      );

      const fullData = data.map((transaction) => ({
        ...transaction,
        accountIBAN: account.iban,
      }));

      this.monobankTransactionService.createOrUpdateMany(fullData);

      return fullData;
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.TOO_MANY_REQUESTS
      ) {
        return await this.monobankTransactionService.findByAccountId(
          account.iban,
        );
      } else {
        throw e;
      }
    }
  }

  @Post('/add-monobank-api-key')
  @UseGuards(AuthGuard('jwt'))
  async addMonobankApikey(@Req() req, @Body() body): Promise<void> {
    const userId = req.user.userId;
    const apiKey = body.apiKey;
    if (!apiKey) {
      throw new HttpException('Api key not found', HttpStatus.NOT_FOUND);
    }
    const [byApiKey, byUserId] = await Promise.all([
      this.apikeysService.findByApiKey(apiKey),
      this.apikeysService.findByUserId(userId),
    ]);
    if (byApiKey !== null || byUserId !== null) {
      throw new HttpException('Api key already exists', HttpStatus.CONFLICT);
    }

    try {
      const data = await this.monoBankService.fetchAccountData(apiKey);
      await this.monobankUserDataService.createOrUpdate({ ...data, userId });
      await this.apikeysService.create(userId, apiKey);
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.FORBIDDEN
      ) {
        throw new HttpException('Invalid api key', HttpStatus.FORBIDDEN);
      }
    }
  }

  @Get('version')
  getVersion(): string {
    return '1.0.0';
  }
}
