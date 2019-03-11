import * as factory from '@pecorino/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';
import { TransactionService } from '../transaction';

/**
 * 転送取引サービス
 */
export class TransferTransactionService extends Service implements TransactionService {
    public typeOf: factory.transactionType = factory.transactionType.Transfer;

    /**
     * 取引を開始する
     */
    public async start<T extends factory.account.AccountType>(
        params: factory.transaction.transfer.IStartParams<T>
    ): Promise<factory.transaction.transfer.ITransaction<T>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/start`,
            method: 'POST',
            body: {
                ...params,
                amount: params.object.amount,
                accountType: params.object.fromLocation.accountType,
                notes: params.object.description,
                fromAccountNumber: params.object.fromLocation.accountNumber,
                toAccountNumber: params.object.toLocation.accountNumber
            },
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引中止
     */
    public async cancel(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
