import * as factory from '@pecorino/factory';
import { OK } from 'http-status';

import { Service } from '../service';

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
    T extends factory.actionType.MoneyTransfer ? factory.action.transfer.moneyTransfer.IAction :
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
        });
    }
}
