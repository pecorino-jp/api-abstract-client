// tslint:disable:no-implicit-dependencies

/**
 * event service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as pecorinoapi from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('口座照会', () => {
    let sandbox: sinon.SinonSandbox;
    let events: pecorinoapi.service.Account;

    before(() => {
        const auth = new StubAuthClient();
        events = new pecorinoapi.service.Account({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
});

describe('取引履歴検索', () => {
    let sandbox: sinon.SinonSandbox;
    let events: pecorinoapi.service.Account;

    before(() => {
        const auth = new StubAuthClient();
        events = new pecorinoapi.service.Account({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
});
