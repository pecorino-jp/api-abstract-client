import { CREATED, OK } from 'http-status';

import { Service } from '../../service';

export interface IStartParams {
    toAccountId: string;
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
    price: number;
    notes: string;
}

/**
 * 入金取引サービス
 * @class
 */
export class DepositTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start(params: IStartParams): Promise<any> {
        return this.fetch({
            uri: '/transactions/deposit/start',
            method: 'POST',
            body: {
                toAccountId: params.toAccountId,
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
                price: params.price,
                notes: params.notes
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引確定
     * @returns {any} 取引結果
     */
    public async confirm(params: {
        transactionId: string;
    }): Promise<any> {
        return this.fetch({
            uri: `/transactions/deposit/${params.transactionId}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
            }
        });
    }
}
