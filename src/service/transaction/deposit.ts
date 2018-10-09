import * as factory from '@pecorino/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams<T extends factory.account.AccountType> {
    toAccountNumber: string;
    expires: Date;
    agent: factory.transaction.deposit.IAgent;
    recipient: factory.transaction.deposit.IRecipient;
    amount: number;
    accountType: T;
    notes: string;
}

/**
 * 入金取引サービス
 */
export class DepositTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start<T extends factory.account.AccountType>(
        params: IStartParams<T>
    ): Promise<factory.transaction.deposit.ITransaction<T>> {
        return this.fetch({
            uri: '/transactions/deposit/start',
            method: 'POST',
            body: {
                toAccountNumber: params.toAccountNumber,
                expires: params.expires,
                agent: params.agent,
                recipient: params.recipient,
                amount: params.amount,
                accountType: params.accountType,
                notes: params.notes
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
            uri: `/transactions/deposit/${params.transactionId}/confirm`,
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
            uri: `/transactions/deposit/${params.transactionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }
}
