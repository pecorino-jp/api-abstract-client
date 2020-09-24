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
    public async open(params: {
        /**
         * プロジェクト
         */
        project: {
            typeOf: 'Project';
            id: string;
        };
        /**
         * 口座種別
         */
        typeOf?: string;
        /**
         * 口座タイプ
         */
        accountType: string;
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
        })
            .then(async (response) => response.json());
    }

    /**
     * 口座編集
     * 名義変更などに使用
     */
    public async update(params: {
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
            uri: `/accounts/Default/${params.accountNumber}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
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
        await this.fetch({
            uri: `/accounts/Default/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座を検索する
     */
    public async search(
        params: factory.account.ISearchConditions
    ): Promise<ISearchResult<factory.account.IAccount[]>> {
        return this.fetch({
            uri: '/accounts',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: (typeof response.headers.get('X-Total-Count') === 'string')
                        ? Number(response.headers.get('X-Total-Count'))
                        : undefined,
                    data: await response.json()
                };
            });
    }

    /**
     * 口座の取引履歴を検索する
     */
    public async searchMoneyTransferActions(
        params: factory.action.transfer.moneyTransfer.ISearchConditions
    ): Promise<ISearchResult<factory.action.transfer.moneyTransfer.IAction[]>> {
        return this.fetch({
            uri: `/accounts/Default/${params.accountNumber}/actions/moneyTransfer`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: (typeof response.headers.get('X-Total-Count') === 'string')
                        ? Number(response.headers.get('X-Total-Count'))
                        : undefined,
                    data: await response.json()
                };
            });
    }
}
