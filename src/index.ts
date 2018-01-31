// tslint:disable:max-classes-per-file

/**
 * PECORINO API Service Library for Javascript
 * @ignore
 */

import { AuthClient } from './auth/authClient';

import { AccountService } from './service/account';
import { PayTransactionService } from './service/transaction/pay';
import * as transporters from './transporters';

// export import factory = factory;
export import transporters = transporters;

/**
 * auth client abstract class
 * 認証クライアント抽象クラス
 * @export
 * @class
 * @abstract
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * 口座サービス
     * @class
     */
    export class Account extends AccountService { }
    export namespace transaction {
        /**
         * 支払取引サービス
         * @class
         */
        export class Pay extends PayTransactionService { }
    }
}
