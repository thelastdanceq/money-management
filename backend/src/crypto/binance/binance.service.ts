import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';

const apiKey =
  '2jIqdnpizmGrLShyypR3ye8iebjHX0pF5vGWvItQ2srm209jSrrm0Q5qXOgg47Yc';
const secretKey =
  'vMuuEs61S1qU8P7gG4TuLxheAM9Kz2ztt7xlgUNdVfs6LMV1HQgvJ1VJygbueolz';

@Injectable()
export class BinanceService {
  async getUserData() {
    const queryString = `timestamp=${Date.now()}&startTime=1675806152&endTime=1683492152`;
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(queryString)
      .digest('hex');

    const headers = {
      'X-MBX-APIKEY': apiKey,
    };

    const accountInformation = await fetch(
      `https://api.binance.com/sapi/v1/capital/deposit/hisrec?${queryString}&signature=${signature}`,
      { headers },
    );

    const res = await accountInformation.json();

    console.log('res', res);
    return res;
  }
}
