import {fetch, common} from 'common';


/**
 * 获取会员优惠券列表
 * @param couponIsUser
 */
export function couponMemberList({couponIsUser}) {
    return fetch.get('/couponApi/couponMemberList', {
        couponIsUser
    });
}

/**
 * 获取优惠券列表
 * @param storeId
 */
export function couponList({storeId, pageNo,pageSize}) {
    return fetch.get('/couponApi/list', {
        storeId,
        pageNo,
        pageSize
    });
}


/**
 * 领取优惠券
 * @param couponId
 */
export function receiveCoupon({couponId}) {
    return fetch.get('/couponApi/receiveCoupon', {
        couponId
    });
}

/**
 * 领取赠送的优惠券
 * @param memberCouponId
 */
export function receiveCouponShare({memberCouponId}) {
    return fetch.get('/couponApi/receive', {
        memberCouponId
    });
}


/**
 * 领取分享的优惠券
 * @param shareOrderId
 */
export function receiveAccess({shareOrderId}) {
    return fetch.get('/shareCoupon/api/access', {
        shareOrderId
    });
}


/**
 * 赠送优惠券
 * @param couponId
 */
export function raiseGive({memberCouponId}) {
    return fetch.get('/couponApi/give', {
        memberCouponId
    });
}