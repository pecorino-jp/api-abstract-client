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
 * 口座サービス
 */
export class AccountService extends Service {
    /**
     * 口座を開設する
     */
    public async open(params: {
        name: string;
        initialBalance?: number;
    }): Promise<factory.account.IAccount> {
        return this.fetch({
            uri: '/accounts',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * 口座を検索する
     */
    public async search(params: {
        accountIds: string[];
    }): Promise<factory.account.IAccount[]> {
        return this.fetch({
            uri: '/accounts',
            method: 'GET',
            qs: {
                accountIds: params.accountIds
            },
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
            uri: `/accounts/${params.accountId}/actions/moneyTransfer`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
}
