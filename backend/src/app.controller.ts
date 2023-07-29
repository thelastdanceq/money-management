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
import { IMonobankTransaction } from './banks/monobank.interface';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeysService } from './monobankApikeys/apikeys.service';

@Controller()
export class AppController {
  constructor(
    private monoBankService: MonobankService,
    private readonly monobankUserDataService: MonobankUserDataService,
    private readonly monobankTransactionService: MonobankTransactionService,
    private readonly apikeysService: ApiKeysService,
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
      this.monobankUserDataService.createOrUpdate(data);
      return data;
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.TOO_MANY_REQUESTS
      ) {
        return await this.monobankUserDataService.findOne(apiKey.key);
      } else {
        throw e;
      }
    }
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
    try {
      const data = await this.monoBankService.fetchTransactionHistory(
        apiKey.key,
        body.accountId,
        body.from,
        body.to,
      );

      this.monobankTransactionService.createOrUpdateMany(data);

      return data;
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.TOO_MANY_REQUESTS
      ) {
        return await this.monobankTransactionService.findByApiKey(apiKey.key);
      } else {
        throw e;
      }
    }
  }

  @Post('/add-monobank-api-key')
  @UseGuards(AuthGuard('jwt'))
  async addMonobankApikey(@Req() req, @Body() body): Promise<void> {
    const userId = req.user.userId;
    await this.apikeysService.create(userId, body.apiKey);
  }
}
