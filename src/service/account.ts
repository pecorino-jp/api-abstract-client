import { OK } from 'http-status';

import { Service } from '../service';

/**
 * パフォーマンス検索結果インターフェース
 * @export
 * @interface
 */
export interface ISearchTradeActionsConditions {
    acconutId: string;
}

/**
 * 口座サービス
 * @class
 */
export class AccountService extends Service {
    /**
     * 口座照会
     */
    public async findById(params: {
        id: string;
    }): Promise<any> {
        return this.fetch({
            uri: `/accounts/${params.id}`,
            method: 'GET',
            qs: {
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引履歴検索
     */
    public async searchTradeActions(
        /**
         * 検索条件
         */
        params: ISearchTradeActionsConditions
    ): Promise<any[]> {
        return this.fetch({
            uri: `/accounts/${params.acconutId}/actions/trade`,
            method: 'GET',
            qs: {
            },
            expectedStatusCodes: [OK]
        });
    }
}
