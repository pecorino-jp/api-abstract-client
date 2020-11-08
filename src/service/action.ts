import * as factory from '@pecorino/factory';
import { OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * アクションサービス
 */
export class ActionService extends Service {
    /**
     * 転送アクションを検索する
     */
    public async searchMoneyTransferActions(
        params: factory.action.transfer.moneyTransfer.ISearchConditions
    ): Promise<ISearchResult<factory.action.transfer.moneyTransfer.IAction[]>> {
        return this.fetch({
            uri: `/actions/moneyTransfer`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    data: await response.json()
                };
            });
    }
}
