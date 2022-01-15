import { Account } from './Account';
import { TAccountId } from './AccountsApi';
import { AsyncResult } from '../../common';

export abstract class AccountRepository {
  abstract findByEmail(email: string): AsyncResult<Account>;
  abstract findById(id: TAccountId): AsyncResult<Account>;
  abstract save(account: Account): AsyncResult<TAccountId>;
}
