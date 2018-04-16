/**
 * API请求
 * Created by leimingtech-lhm on 2017/5/16.
 */
import {fetch, common} from 'common';

/**
 * 众筹列表
 * @param storeId
 * @param activityStatus
 * @param pageSize
 * @param pageNo
 */
export function raiseList({storeId, activityStatus,pageSize, pageNo }) {
    return fetch.get('/raise/api/list', {
        storeId,
        activityStatus,
        pageSize,
        pageNo
    })
}

/**
 * 众筹详情
 * @param raiseId
 */
export function raiseDetail ({raiseId }) {
    return fetch.get('/raise/api/info', {
        raiseId
    })
}

/**
 * 众筹进展
 * @param raiseId
 * @param pageSize
 * @param pageNo
 */
export function raiseDevelop({raiseId,pageSize,pageNo }) {
    return fetch.get('/raise/api/develop', {
        raiseId,
        pageSize,
        pageNo
    })
}

/**
 * 参与成员
 * @param raiseId
 * @param pageSize
 * @param pageNo
 */
export function raiseJoin({raiseId,pageSize,pageNo }) {
    return fetch.get('/raise/api/members', {
        raiseId,
        pageSize,
        pageNo
    })
}

/**
 * 中奖人员
 * @param raiseId
 * @param pageSize
 * @param pageNo
 */
export function raiseLuckyer({raiseId,pageSize,pageNo }) {
    return fetch.get('/raise/api/luckyer', {
        raiseId,
        pageSize,
        pageNo
    })
}


/**
 * 众筹详情
 * @param raiseItemId
 */
export function raiseTypeDetail ({raiseItemId }) {
    return fetch.get('/raise/api/detail', {
        raiseItemId
    })
}

/**
 * 提交订单
 * @param raiseItemId
 * @param raiseMoney
 * @param addressId
 * @param remark
 */
export function raiseOrder({raiseItemId,raiseMoney,addressId,remark}) {
    return fetch.get('/raise/api/order', {
        raiseItemId,
        raiseMoney,
        addressId,
        remark
    })
}

/**
 * 个人中心我的众筹
 * @param raiseItemId
 * @param raiseMoney
 * @param addressId
 * @param remark
 */
export function crowdListOrder({orderState,pageNo,pageSize}) {
    return fetch.get('/raise/api/member/list', {
        orderState,
        pageNo,
        pageSize
    })
}


/**
 * 众筹类型
 * @param raiseId
 */
export function crowdItems({raiseId}) {
    return fetch.get('/raise/api/items', {
        raiseId
    })
}