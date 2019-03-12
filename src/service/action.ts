import * as factory from '@pecorino/factory';
import { OK } from 'http-status';

import { ISearchResult, Service } from '../service';

export interface ISearchActionsConditions<T extends factory.actionType> {
    typeOf: T;
    actionStatuses?: factory.accountStatusType[];
    startDateFrom?: Date;
    startDateThrough?: Date;
    purposeTypeOfs?: factory.transactionType[];
    fromLocationAccountNumbers?: string[];
    toLocationAccountNumbers?: string[];
    limit: number;
}

export type IAction<T> =
    T extends factory.actionType.MoneyTransfer ? factory.action.transfer.moneyTransfer.IAction<factory.account.AccountType> :
    factory.action.IAction<factory.action.IAttributes<any, any>>;

/**
 * アクションサービス
 */
export class ActionService extends Service {
    /**
     * アクションを検索する
     */
    public async search<T extends factory.actionType>(params: ISearchActionsConditions<T>): Promise<IAction<T>[]> {
        return this.fetch({
            uri: '/actions',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 転送アクションを検索する
     */
    public async searchMoneyTransferActions<T extends factory.account.AccountType>(
        params: factory.action.transfer.moneyTransfer.ISearchConditions<T>
    ): Promise<ISearchResult<factory.action.transfer.moneyTransfer.IAction<T>[]>> {
        return this.fetch({
            uri: `/actions/moneyTransfer`,
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
