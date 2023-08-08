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
import { BinanceService } from './crypto/binance/binance.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeysService } from './apiKeys/apikeys.service';
import { ApiKeyTypes } from './apiKeys/apikeys.schema';

@Controller()
export class BinanceController {
  constructor(
    private readonly binanceService: BinanceService,
    private readonly apikeysService: ApiKeysService,
  ) {}

  @Post('/set-binance-tokens')
  @UseGuards(AuthGuard('jwt'))
  async setBinanceTokens(
    @Req() req,
    @Body() body: { apiKey: string; apiSecret: string },
  ): Promise<any> {
    const userId = req.user.userId;
    await this.apikeysService.create(
      userId,
      body.apiKey,
      ApiKeyTypes.BINANCE_API_KEY,
    );
    await this.apikeysService.create(
      userId,
      body.apiSecret,
      ApiKeyTypes.BINANCE_SECRET_KEY,
    );
  }
  @Get('/get-binance-user-data')
  @UseGuards(AuthGuard('jwt'))
  async getBinanceUserData(@Req() req): Promise<any> {
    const userId = req.user.userId;
    const apiKey = await this.apikeysService.findByUserId(
      userId,
      ApiKeyTypes.BINANCE_API_KEY,
    );
    const secretKey = await this.apikeysService.findByUserId(
      userId,
      ApiKeyTypes.BINANCE_SECRET_KEY,
    );

    if (!apiKey || !secretKey) {
      throw new HttpException('Api key not found', HttpStatus.NOT_FOUND);
    }

    return this.binanceService.getUserData(secretKey.key, apiKey.key);
  }
}
