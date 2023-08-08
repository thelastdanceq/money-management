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
import { ApiKeysService } from './apiKeys/apikeys.service';
import { BinanceService } from './crypto/binance/binance.service';

@Controller()
export class AppController {
  constructor() {}
  @Get('version')
  getVersion(): string {
    return '1.0.0';
  }
}
