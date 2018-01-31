/**
 * 注文取引開始サンプル
 * @ignore
 */

const pecorinoapi = require('../');

const transactions = new pecorinoapi.service.transaction.PlaceOrder({
    endpoint: 'https://example.com'
});

transactions.start({
    expires: new Date(),
    sellerId: '',
    passportToken: ''
}).then((result) => {
    console.log(result);
});;

