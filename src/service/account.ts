import * as factory from '@pecorino/factory';
import { CREATED, NO_CONTENT, OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * 口座サービス
 */
export class AccountService extends Service {
    /**
     * 口座を開設する
     */
    public async open<T extends factory.account.AccountType>(params: {
        /**
         * 口座タイプ
         */
        accountType: T;
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
    }): Promise<factory.account.IAccount<T>> {
        return this.fetch({
            uri: '/accounts',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }

    /**
     * 口座編集
     * 名義変更などに使用
     */
    public async update<T extends factory.account.AccountType>(params: {
        /**
         * 口座タイプ
         */
        accountType: T;
        /**
         * 口座番号
         */
        accountNumber: string;
        /**
         * 口座名義
         */
        name?: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/accounts/${params.accountType}/${params.accountNumber}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座を解約する
     */
    public async close<T extends factory.account.AccountType>(params: {
        /**
         * 口座タイプ
         */
        accountType: T;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/accounts/${params.accountType}/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座を検索する
     */
    public async search<T extends factory.account.AccountType>(
        params: factory.account.ISearchConditions<T>
    ): Promise<factory.account.IAccount<T>[]> {
        return this.fetch({
            uri: '/accounts',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 口座を検索する
     */
    public async searchWithTotalCount<T extends factory.account.AccountType>(
        params: factory.account.ISearchConditions<T>
    ): Promise<ISearchResult<factory.account.IAccount<T>[]>> {
        return this.fetch({
            uri: '/accounts',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => {
            return {
                totalCount: Number(<string>response.headers.get('X-Total-Count')),
                data: await response.json()
            };
        });
    }

    /**
     * 口座の取引履歴を検索する
     */
    public async searchMoneyTransferActions<T extends factory.account.AccountType>(
        params: factory.action.transfer.moneyTransfer.ISearchConditions<T>
    ): Promise<factory.action.transfer.moneyTransfer.IAction<T>[]> {
        return this.fetch({
            uri: `/accounts/${params.accountType}/${params.accountNumber}/actions/moneyTransfer`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 口座の取引履歴を検索する
     */
    public async searchMoneyTransferActionsWithTotalCount<T extends factory.account.AccountType>(
        params: factory.action.transfer.moneyTransfer.ISearchConditions<T>
    ): Promise<ISearchResult<factory.action.transfer.moneyTransfer.IAction<T>[]>> {
        return this.fetch({
            uri: `/accounts/${params.accountType}/${params.accountNumber}/actions/moneyTransfer`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => {
            return {
                totalCount: Number(<string>response.headers.get('X-Total-Count')),
                data: await response.json()
            };
        });
    }
}
