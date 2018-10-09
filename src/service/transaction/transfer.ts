import * as factory from '@pecorino/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams<T extends factory.account.AccountType> {
    expires: Date;
    agent: factory.transaction.transfer.IAgent;
    recipient: factory.transaction.transfer.IRecipient;
    amount: number;
    accountType: T;
    notes: string;
    fromAccountNumber: string;
    toAccountNumber: string;
}

/**
 * 転送取引サービス
 */
export class TransferTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start<T extends factory.account.AccountType>(
        params: IStartParams<T>
    ): Promise<factory.transaction.transfer.ITransaction<T>> {
        return this.fetch({
            uri: '/transactions/transfer/start',
            method: 'POST',
            body: {
                expires: params.expires,
                agent: params.agent,
                recipient: params.recipient,
                amount: params.amount,
                accountType: params.accountType,
                notes: params.notes,
                fromAccountNumber: params.fromAccountNumber,
                toAccountNumber: params.toAccountNumber
            },
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        transactionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/transfer/${params.transactionId}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }

    /**
     * 取引中止
     */
    public async cancel(params: {
        transactionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/transfer/${params.transactionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }
}
