import * as factory from '@chevre/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';
import { TransactionService } from '../transaction';

/**
 * 転送取引サービス
 */
export class TransferTransactionService extends Service implements TransactionService {
    public typeOf: factory.account.transactionType = factory.account.transactionType.Transfer;

    /**
     * 取引を開始する
     */
    public async start(
        params: factory.account.transaction.transfer.IStartParamsWithoutDetail
    ): Promise<factory.account.transaction.transfer.ITransaction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/start`,
            method: 'POST',
            body: params,
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
