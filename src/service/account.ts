import * as factory from '@pecorino/factory';
import { CREATED, NO_CONTENT, OK } from 'http-status';

import { Service } from '../service';

/**
 * 転送アクション検索条件インターフェース
 */
export interface ISearchTransferActionsConditions {
    accountNumber: string;
}

export interface ISearchAccountsConditions {
    accountNumbers: string[];
    statuses: factory.accountStatusType[];
    /**
     * 口座名義
     */
    name?: string;
    limit: number;
}

/**
 * 口座サービス
 */
export class AccountService extends Service {
    /**
     * 口座を開設する
     */
    public async open(params: {
        /**
         * 口座番号
         * Pecorinoサービス内(ひとつのPecorinoAPIエンドポイント)でユニークとなるように指定側で管理すること
         * 重複すればステータスコード409が返されます。
         */
        accountNumber: string;
        /**
         * 口座名義
         */
        name: string;
    }): Promise<factory.account.IAccount> {
        return this.fetch({
            uri: '/accounts',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * 口座を解約する
     */
    public async close(params: {
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/accounts/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座を検索する
     */
    public async search(params: ISearchAccountsConditions): Promise<factory.account.IAccount[]> {
        return this.fetch({
            uri: '/accounts',
            method: 'GET',
            qs: params,
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
            uri: `/accounts/${params.accountNumber}/actions/moneyTransfer`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
}
