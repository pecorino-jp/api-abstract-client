// tslint:disable:no-implicit-dependencies
/**
 * 支払取引サービステスト
 * @ignore
 */
import { } from 'mocha';
// import * as assert from 'power-assert';
import * as sinon from 'sinon';
// import * as pecorinoapi from '../../index';

// import { StubAuthClient } from '../../auth/authClient';

// const API_ENDPOINT = 'https://localhost';

describe('支払取引サービス', () => {
    let sandbox: sinon.SinonSandbox;
    // let transactions: pecorinoapi.service.transaction.Pay;

    before(() => {
        // const auth = new StubAuthClient();
        // transactions = new pecorinoapi.service.transaction.Pay({
        //     auth: auth,
        //     endpoint: API_ENDPOINT
        // });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
});
