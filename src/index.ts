// tslint:disable:max-classes-per-file

/**
 * PECORINO API Service Library for Javascript
 */
import * as factory from '@motionpicture/pecorino-factory';

import { AuthClient } from './auth/authClient';

import { AccountService } from './service/account';
import { ActionService } from './service/action';
import { DepositTransactionService } from './service/transaction/deposit';
import { TransferTransactionService } from './service/transaction/transfer';
import { WithdrawTransactionService } from './service/transaction/withdraw';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * auth client abstract class
 * 認証クライアント抽象クラス
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * アクションサービス
     */
    export class Action extends ActionService { }
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
         * 出金取引サービス
         */
        export class Withdraw extends WithdrawTransactionService { }
        /**
         * 転送取引サービス
         */
        export class Transfer extends TransferTransactionService { }
    }
}
