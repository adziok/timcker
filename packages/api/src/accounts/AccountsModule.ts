import { Module } from '@nestjs/common';
import { IAccountsApi } from './AccountsApi';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IAccountsApi,
      useValue: () => {
        'h';
      },
    },
  ],
  exports: [IAccountsApi],
})
export class AccountsModule {}
