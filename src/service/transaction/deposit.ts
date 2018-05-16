import * as factory from '@motionpicture/pecorino-factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams {
    toAccountNumber: string;
    expires: Date;
    agent: {
        typeOf: string;
        id: string;
        name: string;
        url: string;
    };
    recipient: {
        typeOf: string;
        id: string;
        name: string;
        url: string;
    };
    amount: number;
    notes: string;
}

/**
 * 入金取引サービス
 */
export class DepositTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start(params: IStartParams): Promise<factory.transaction.deposit.ITransaction> {
        return this.fetch({
            uri: '/transactions/deposit/start',
            method: 'POST',
            body: {
                toAccountNumber: params.toAccountNumber,
                expires: params.expires,
                agent: {
                    typeOf: params.agent.typeOf,
                    id: params.agent.id,
                    name: params.agent.name,
                    url: params.agent.url
                },
                recipient: {
                    typeOf: params.recipient.typeOf,
                    id: params.recipient.id,
                    name: params.recipient.name,
                    url: params.recipient.url
                },
                amount: params.amount,
                notes: params.notes
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
            uri: `/transactions/deposit/${params.transactionId}/confirm`,
            method: 'POST',
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
            uri: `/transactions/deposit/${params.transactionId}/cancel`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }
}
