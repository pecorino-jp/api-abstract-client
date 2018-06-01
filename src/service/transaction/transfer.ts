import * as factory from '@motionpicture/pecorino-factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams {
    expires: Date;
    agent: {
        name: string;
    };
    recipient: {
        typeOf: string;
        id: string;
        name: string;
        url: string;
    };
    amount: number;
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
    public async start(params: IStartParams): Promise<factory.transaction.transfer.ITransaction> {
        return this.fetch({
            uri: '/transactions/transfer/start',
            method: 'POST',
            body: {
                expires: params.expires,
                agent: {
                    name: params.agent.name
                },
                recipient: {
                    typeOf: params.recipient.typeOf,
                    id: params.recipient.id,
                    name: params.recipient.name,
                    url: params.recipient.url
                },
                amount: params.amount,
                notes: params.notes,
                fromAccountNumber: params.fromAccountNumber,
                toAccountNumber: params.toAccountNumber
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
        return this.fetch({
            uri: `/transactions/transfer/${params.transactionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }
}
