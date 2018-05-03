import * as factory from '@motionpicture/pecorino-factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams {
    expires: Date;
    recipient: {
        typeOf: string;
        id: string;
        name: string;
        url: string;
    };
    price: number;
    notes: string;
    fromAccountId: string;
}

/**
 * 支払取引サービス
 */
export class PayTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start(params: IStartParams): Promise<factory.transaction.pay.ITransaction> {
        return this.fetch({
            uri: '/transactions/pay/start',
            method: 'POST',
            body: {
                expires: params.expires,
                recipient: {
                    typeOf: params.recipient.typeOf,
                    id: params.recipient.id,
                    name: params.recipient.name,
                    url: params.recipient.url
                },
                price: params.price,
                notes: params.notes,
                fromAccountId: params.fromAccountId
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
            uri: `/transactions/pay/${params.transactionId}/confirm`,
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
            uri: `/transactions/pay/${params.transactionId}/cancel`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT],
            body: {}
        });
    }
}
