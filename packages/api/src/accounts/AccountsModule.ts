import { Module } from '@nestjs/common';
import {
  IAccountsApi,
  TAccount,
  TAccountId,
  TCreateAccount,
} from './AccountsApi';

const users: Record<string, Partial<TAccount>> = {};

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IAccountsApi,
      useValue: {
        async createAccount(account: TCreateAccount): Promise<TAccountId> {
          users[account.email] = account;
          return '123';
        },
        async getAccountByEmail(email: string): Promise<TAccount> {
          return users[email] as any;
        },
      },
    },
  ],
  exports: [IAccountsApi],
})
export class AccountsModule {}
