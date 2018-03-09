import { OK } from 'http-status';

import { Service } from '../service';

/**
 * 転送アクション検索条件インターフェース
 * @export
 */
export interface ISearchTransferActionsConditions {
    accountId: string;
}

/**
 * 口座サービス
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
    public async searchTransferActions(
        /**
         * 検索条件
         */
        params: ISearchTransferActionsConditions
    ): Promise<any[]> {
        return this.fetch({
            uri: `/accounts/${params.accountId}/actions/moneyTransfer`,
            method: 'GET',
            qs: {
            },
            expectedStatusCodes: [OK]
        });
    }
}
