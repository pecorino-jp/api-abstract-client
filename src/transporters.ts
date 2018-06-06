// tslint:disable:max-classes-per-file

/**
 * transporters
 * @ignore
 */

import * as createDebug from 'debug';
import { NO_CONTENT } from 'http-status';
import * as fetch from 'isomorphic-fetch';

const debug = createDebug('pecorino-api-abstract-client:transporters');
// tslint:disable-next-line
const pkg = require('../package.json');

/**
 * transporter abstract class
 * トランスポーター抽象クラス
 * @export
 */
export abstract class Transporter {
    public abstract async fetch(url: string, options: RequestInit): Promise<any>;
}

export type IBodyResponseCallback = Promise<any>;

/**
 * RequestError
 * @export
 */
export class RequestError extends Error {
    public code: number;
    public errors: Error[];

    constructor(message?: string) {
        // tslint:disable-next-line:no-single-line-block-comment
        super(message)/* istanbul ignore next */;

        this.name = 'PecorinoRequestError';
    }
}

/**
 * stub transporter
 * スタブトランポーター
 * @export
 */
export class StubTransporter implements Transporter {
    public body: any;
    constructor(body: any) {
        this.body = body;
    }

    public async fetch(url: string, options: RequestInit) {
        debug('fetching...', url, options);

        return this.body;
    }
}

/**
 * DefaultTransporter
 * @export
 */
export class DefaultTransporter implements Transporter {
    /**
     * Default user agent.
     */
    public static readonly USER_AGENT: string = `pecorino-api-javascript-client/${pkg.version}`;

    public expectedStatusCodes: number[];

    constructor(expectedStatusCodes: number[]) {
        this.expectedStatusCodes = expectedStatusCodes;
    }

    /**
     * Configures request options before making a request.
     */
    public static CONFIGURE(options: RequestInit): RequestInit {
        // set transporter user agent
        options.headers = (options.headers !== undefined) ? options.headers : {};
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore else */
        if (!(<any>options.headers)['User-Agent']) {
            (<any>options.headers)['User-Agent'] = DefaultTransporter.USER_AGENT;
        } else if ((<any>options.headers)['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) === -1) {
            (<any>options.headers)['User-Agent'] = `${(<any>options.headers)['User-Agent']} ${DefaultTransporter.USER_AGENT}`;
        }

        return options;
    }

    /**
     * Makes a request with given options and invokes callback.
     */
    public async fetch(url: string, options: RequestInit) {
        const fetchOptions = DefaultTransporter.CONFIGURE(options);

        debug('fetching...', url, fetchOptions);

        return fetch(url, fetchOptions).then(async (response) => this.wrapCallback(response));
    }

    /**
     * Wraps the response callback.
     */
    private async wrapCallback(response: Response): Promise<any> {
        let err: RequestError = new RequestError('An unexpected error occurred');

        debug('request processed', response.status);
        if (this.expectedStatusCodes.indexOf(response.status) < 0) {
            // Consider all 4xx and 5xx responses errors.
            let body: any;
            try {
                // Only and only application/json responses should
                // be decoded back to JSON, but there are cases API back-ends
                // responds without proper content-type.
                body = await response.clone().json();
            } catch (error) {
                body = await response.clone().text();
            }

            if (typeof body === 'object' && body.error !== undefined) {
                err = new RequestError(body.error.message);
                err.code = response.status;
                err.errors = body.error.errors;
            } else {
                err = new RequestError(body);
                err.code = response.status;
                err.errors = [];
            }
        } else {
            if (response.status === NO_CONTENT) {
                // consider 204
                return;
            } else {
                // consider 200,201
                return response.json();
            }
        }

        throw err;
    }
}
