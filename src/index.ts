// tslint:disable:max-classes-per-file

/**
 * PECORINO API Service Library for Javascript
 * @ignore
 */

import { AuthClient } from './auth/authClient';

import { AccountService } from './service/account';
import { DepositTransactionService } from './service/transaction/deposit';
import { PayTransactionService } from './service/transaction/pay';
import { TransferTransactionService } from './service/transaction/transfer';
import * as transporters from './transporters';

// export import factory = factory;
export import transporters = transporters;

/**
 * auth client abstract class
 * 認証クライアント抽象クラス
 * @export
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * 口座サービス
     */
    export class Account extends AccountService { }
    export namespace transaction {
        /**
         * 入金取引サービス
         */
        export class Deposit extends DepositTransactionService { }
        /**
         * 支払取引サービス
         */
        export class Pay extends PayTransactionService { }
        /**
         * 転送取引サービス
         */
        export class Transfer extends TransferTransactionService { }
    }
}
