import { Injectable } from '@nestjs/common';
import {
  IAccountsApi,
  TAccount,
  TAccountId,
  TCreateAccount,
} from './AccountsApi';
import { AccountRepository } from './AccountRepository';
import { Account } from './Account';
import { AsyncResult, ok } from '../../common';

@Injectable()
export class AccountService implements IAccountsApi {
  constructor(private readonly accountRepository: AccountRepository) {}

  createAccount(accountData: TCreateAccount): AsyncResult<TAccountId> {
    const account = Account.create(accountData);
    return this.accountRepository.save(account);
  }

  async getAccountByEmail(email: string): AsyncResult<TAccount> {
    return (await this.accountRepository.findByEmail(email)).map<TAccount>(
      (value: Account) =>
        ok<TAccount>({
          id: value.id,
          email: value.email,
          imageUrl: '',
          username: value.username,
        }),
    );
  }
}
