import * as factory from '@pecorino/factory';

/**
 * 取引抽象サービス
 */
export abstract class TransactionService {
    public typeOf: factory.transactionType;
}
