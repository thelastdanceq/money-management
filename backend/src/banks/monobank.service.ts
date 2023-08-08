import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBankService } from './bank-service.interface';
import { IMonobankTransaction, IMonobankUserData } from './monobank.interface';
import { MONOBANK_API_URL } from './monobank.contants';

@Injectable()
export class MonobankService
  implements
    IBankService<
      Omit<IMonobankUserData, 'userId'>,
      Omit<IMonobankTransaction, 'accountId'>
    >
{
  private apiURL: string = MONOBANK_API_URL;
  async fetchAccountData(
    apiKey: string,
  ): Promise<Omit<IMonobankUserData, 'userId'>> {
    const response = await fetch(this.apiURL + '/personal/client-info', {
      headers: {
        'X-Token': apiKey,
      },
    });

    if (response.status === 403) {
      throw new HttpException('Unknown "X-Token"', HttpStatus.FORBIDDEN);
    }

    if (response.status === 429) {
      throw new HttpException(
        'Too Many Requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return {
      ...(await response.json()),
    };
  }
  async fetchTransactionHistory(
    apiKey: string,
    accountId: string,
    from: number,
    to?: number,
  ): Promise<Omit<IMonobankTransaction, 'accountId'>[]> {
    let requestURL = `${this.apiURL}/personal/statement/${accountId}/${from}`;
    if (to) {
      requestURL += `/${to}`;
    }
    const response = await fetch(requestURL, {
      headers: {
        'X-Token': apiKey,
      },
    });

    if (response.status === 429) {
      throw new HttpException(
        'Too Many Requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    return await response.json();
  }
}
