import {fetch, common} from 'common';

// check 余额支付密码
export function chkPasswd({passwd}) {
    return fetch.get('/memberapi/chkPasswd', {
        passwd
    });
}

// 获取支付结果
export function getOrderPay({paySn}) {
    // http://testbbc.leimingtech.com/orderapi/getOrderPay
    // paySn	P20170325143406611
    return fetch.get('/orderapi/getOrderPay', {
        paySn
    });
}

// 获取支付结果
export function pointsPay({orderId}) {
    return fetch.get('/api/pointsgoods/orderdetail', {
        orderId
    });
}

//支付宝支付
export function toAliH5pay({orderCode}) {
    console.log(orderCode)
    return fetch.get('/alipayh5/api/toAliH5pay', {
        orderCode
    });
}

//余额支付
export function toBlance({orderCode,payPassword}) {
    return fetch.get('/wxpay/api/pay', {
        orderCode,payPassword,
    });
}

// 微信支付
export function towxpayInfo({orderCode, code}) {
    return fetch.get('/wxh5pay/api/towxpayInfo', {
        orderCode,
        code
    });
}


//分享优惠券
export function shareCoupon({orderId}) {
    return fetch.get('/shareCoupon/api/share', {
        orderId
    });
}


//拼团详情
export function groupDetail({orderId}) {
    return fetch.get(
        '/group/api/groupDetail',{
            orderId
        })
}