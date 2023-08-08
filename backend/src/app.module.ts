import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MonobankService } from './banks/monobank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonobankTransactionService } from './infra/monobank/monobank-transaction.service';
import { MonobankUserDataService } from './infra/monobank/monobank-user-data.service';
import {
  MonobankTransactionSchema,
  MonobankUserDataSchema,
} from './infra/monobank/monobank.schema';
import { AuthController } from './auth/auth.controller';
import { GoogleStrategy } from './auth/google.strategy';
import { UsersService } from './infra/user/user.service';
import { UserSchema } from './infra/user/user.schema';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ApiKeySchema } from './apiKeys/apikeys.schema';
import { ApiKeysService } from './apiKeys/apikeys.service';
import { BinanceService } from './crypto/binance/binance.service';
import { MonobankController } from './monobank.controller';
import { BinanceController } from './binance.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'vladik',
      signOptions: { expiresIn: '60m' },
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'MonobankUserData', schema: MonobankUserDataSchema },
      {
        name: 'MonobankTransaction',
        schema: MonobankTransactionSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      { name: 'ApiKey', schema: ApiKeySchema },
    ]),
  ],
  controllers: [
    AppController,
    AuthController,
    MonobankController,
    BinanceController,
  ],
  providers: [
    MonobankService,
    MonobankTransactionService,
    MonobankUserDataService,
    GoogleStrategy,
    UsersService,
    JwtStrategy,
    ApiKeysService,
    BinanceService,
  ],
})
export class AppModule {}
