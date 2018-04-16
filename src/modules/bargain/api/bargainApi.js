/**
 * API请求
 * Created by leimingtech-lhm on 2017/5/16.
 */
import {fetch, common} from 'common';

/**
 * 砍价列表
 * @param storeId
 * @param pageSize
 * @param pageNo
 */
export function bargainList({pageSize, pageNo, storeId}) {
    return fetch.get('bargain/api/bargainList', {
        pageSize,
        pageNo,
        storeId
    })
}


/**
 * 砍价商品详情
 * @param id
 */
export function bargargainDetail({id, bargainId}) {
    return fetch.get('bargain/api/bargainDetail', {id, bargainId});
}

/**
 * 亲友帮砍列表
 * @param bargainId
 * @param pageSize
 * @param pageNo
 */
export function bargainRankingList({bargainId, pageSize, pageNo}) {
    return fetch.get('bargain/api/bargainRanking', {
        bargainId,
        pageSize,
        pageNo
    })
}


/**
 * 砍价操作
 * @param bargainActivityId
 * @param bargainId
 *
 */
export function bargain({bargainActivityId, bargainId}) {
    return fetch.get('bargain/api/bargain', {
        bargainActivityId,
        bargainId
    })
}

/**
 * 砍价-立即购买
 * @param bargainId
 *
 *
 */
export function bargainPurchase({bargainId}) {
    return fetch.get('bargain/api/bargainPurchase', {
        bargainId
    })
}

/**
 * 计算运费
 * @param specId
 * @param goodsNum
 * @param cityId
 */
export function getFree({specId, goodsNum, cityId}) {
    return fetch.get('shipFee/api/getFee', {
        specId, goodsNum, cityId
    })
}

/**
 * 砍价生成订单
 * @param addressId
 * @param bargainId
 * @param invoiceId
 *@param remark
 */
export function bargainOrder({addressId, bargainId, invoiceId, remark}) {
    return fetch.get('bargain/api/bargainOrder', {
        addressId,
        bargainId,
        invoiceId,
        remark
    })
}


/**
 * 砍价个人中心接口
 * @param orderState
 * @param orderId
 * @param pageNo
 *@param pageSize
 */
export function memberBargain({orderState, orderId, pageNo,orderType, pageSize}) {
    return fetch.get('bargain/api/memberBargain', {
        orderState,
        orderId,
        pageNo,
        pageSize,
        orderType
    })
}


/**
 * 前10排行
 * @param bargainActivityId
 */
export function bargainTopList({bargainActivityId}) {
    return fetch.get('bargain/api/topTen', {
        bargainActivityId
    })
}