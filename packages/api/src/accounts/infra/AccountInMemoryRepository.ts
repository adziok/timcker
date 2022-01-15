import { AccountRepository } from '../application/AccountRepository';
import { TAccountId } from '../application/AccountsApi';
import { Account } from '../application/Account';
import { AsyncResult, err, ok } from '../../common';

export class AccountInMemoryRepository implements AccountRepository {
  private db: Record<string, Account> = {};

  async findByEmail(email: string): AsyncResult<Account> {
    if (this.db[email]) {
      return ok(this.db[email]);
    }
    return err(new Error('Account with given email not found'));
  }

  findById(id: TAccountId): AsyncResult<Account> {
    return undefined;
  }

  async save(account: Account): AsyncResult<TAccountId> {
    this.db[account.email] = account;
    return ok(account.id);
  }
}
