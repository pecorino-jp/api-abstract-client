import * as factory from '@pecorino/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams<T extends factory.account.AccountType> {
    expires: Date;
    agent: factory.transaction.withdraw.IAgent;
    recipient: factory.transaction.withdraw.IRecipient;
    amount: number;
    accountType: T;
    notes: string;
    fromAccountNumber: string;
}

/**
 * 出金取引サービス
 */
export class WithdrawTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start<T extends factory.account.AccountType>(
        params: IStartParams<T>
    ): Promise<factory.transaction.withdraw.ITransaction<T>> {
        return this.fetch({
            uri: '/transactions/withdraw/start',
            method: 'POST',
            body: {
                expires: params.expires,
                agent: params.agent,
                recipient: params.recipient,
                amount: params.amount,
                accountType: params.accountType,
                notes: params.notes,
                fromAccountNumber: params.fromAccountNumber
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        transactionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/withdraw/${params.transactionId}/confirm`,
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
        return this.fetch({
            uri: `/transactions/withdraw/${params.transactionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }
}
