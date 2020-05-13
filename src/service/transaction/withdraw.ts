import * as factory from '@pecorino/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';
import { TransactionService } from '../transaction';

/**
 * 出金取引サービス
 */
export class WithdrawTransactionService extends Service implements TransactionService {
    public typeOf: factory.transactionType = factory.transactionType.Withdraw;

    /**
     * 取引を開始する
     */
    public async start(
        params: factory.transaction.withdraw.IStartParams
    ): Promise<factory.transaction.withdraw.ITransaction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/start`,
            method: 'POST',
            body: {
                ...params,
                amount: params.object.amount,
                accountType: params.object.fromLocation.accountType,
                notes: params.object.description,
                fromAccountNumber: params.object.fromLocation.accountNumber
            },
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        id?: string;
        transactionNumber?: string;
    }): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/transactions/${this.typeOf}/${params.transactionNumber}/confirm?transactionNumber=1`
                : `/transactions/${this.typeOf}/${params.id}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引中止
     */
    public async cancel(params: {
        id?: string;
        transactionNumber?: string;
    }): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/transactions/${this.typeOf}/${params.transactionNumber}/cancel?transactionNumber=1`
                : `/transactions/${this.typeOf}/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
