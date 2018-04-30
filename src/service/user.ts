import * as factory from '@motionpicture/pecorino-factory';
import { CREATED, OK } from 'http-status';

import { Service } from '../service';

/**
 * 転送アクション検索条件インターフェース
 */
export interface ISearchTransferActionsConditions {
    accountId: string;
}

/**
 * ユーザーサービス
 */
export class UserService extends Service {
    /**
     * 自分の口座を開設する
     */
    public async openAccount(params: {
        name: string;
        initialBalance?: number;
    }): Promise<factory.account.IAccount> {
        return this.fetch({
            uri: '/me/accounts',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * 自分の口座を検索する
     */
    public async findAccounts(__: {}): Promise<factory.account.IAccount[]> {
        return this.fetch({
            uri: '/me/accounts',
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 口座の取引履歴を検索する
     */
    public async searchMoneyTransferActions(
        /**
         * 検索条件
         */
        params: ISearchTransferActionsConditions
    ): Promise<factory.action.transfer.moneyTransfer.IAction[]> {
        return this.fetch({
            uri: `/me/accounts/${params.accountId}/actions/moneyTransfer`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
}
