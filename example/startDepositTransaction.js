/**
 * 入金取引開始サンプル
 * @ignore
 */

const pecorinoapi = require('../');

const transactions = new pecorinoapi.service.transaction.Deposit({
    endpoint: 'https://pecorino-api-development.appspot.com'
});

transactions.start({
    toAccountNumber: 'account',
    expires: new Date(),
    agent: {
        typeOf: '',
        id: '',
        name: '',
        url: ''
    },
    recipient: {
        typeOf: '',
        id: '',
        name: '',
        url: ''
    },
    amount: 100,
    notes: ''
}).then((result) => {
    console.log(result);
});;

