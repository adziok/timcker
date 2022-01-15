import { randomUUID } from 'crypto';
import { TAccountId, TCreateAccount } from './AccountsApi';

export class Account {
  id: TAccountId;
  username: string;
  email: string;
  imageUrl: string | null;

  static create(accountData: TCreateAccount) {
    const account = new this();
    account.id = randomUUID();
    Object.assign(account, accountData);
    return account;
  }
}
