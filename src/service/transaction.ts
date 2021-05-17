import * as factory from '@chevre/factory';

/**
 * 取引抽象サービス
 */
export abstract class TransactionService {
    public typeOf: factory.account.transactionType;
}
