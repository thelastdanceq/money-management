import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { CoinInfo } from './binance.types';

// const apiKey =
//   '2jIqdnpizmGrLShyypR3ye8iebjHX0pF5vGWvItQ2srm209jSrrm0Q5qXOgg47Yc';
// const secretKey =
//   'vMuuEs61S1qU8P7gG4TuLxheAM9Kz2ztt7xlgUNdVfs6LMV1HQgvJ1VJygbueolz';

@Injectable()
export class BinanceService {
  async getUserData(secretKey: string, apiKey: string): Promise<CoinInfo[]> {
    const queryString = `timestamp=${Date.now()}`;
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(queryString)
      .digest('hex');

    const headers = {
      'X-MBX-APIKEY': apiKey,
    };

    const accountInformation = await fetch(
      `https://api.binance.com/sapi/v1/capital/config/getall?${queryString}&signature=${signature}`,
      { headers },
    );

    const res = await accountInformation.json();

    if (!accountInformation.ok) {
      this.handleBinanceException(res.code);
    }
    const coins = (res as CoinInfo[]).filter((coin) => Number(coin.free) > 0);
    return coins;
  }

  private handleBinanceException(code: number) {
    switch (code) {
      case -2008: {
        throw new HttpException(
          'Invalid API-key, IP, or permissions for action',
          HttpStatus.BAD_REQUEST,
        );
      }

      default:
        return;
    }
  }
}
