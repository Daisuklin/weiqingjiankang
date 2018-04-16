import { fetch, common } from 'common';

// 团购列表
export function groupPurchaseList({
  activityClass,
  pageNo,
  apKey,
  activityType,
  pageSize,
}) {
  return fetch.get('/groupPurchaseApi/list', {
    activityClass,
    pageNo,
    apKey,
    activityType,
    pageSize,
  });
}


/**
 * 拼团列表
 * @param cartIds
 * @param pageNo
 * @param pageSize
 */
export function groupList({storeId,pageNo,pageSize}) {
        return fetch.get('group/api/list', {
        storeId,
        pageNo,
        pageSize
    })
}

/**
 * 拼团详情
 * @param groupId
 */
export function spellDetails({groupId}) {
    return fetch.get('group/api/info', {
        groupId
    })
}
/**
 * 拼团详情类型
 * @param groupId
 */
export function ginsengGroup({groupItemId}) {
    return fetch.get('group/api/item', {
        groupItemId
    })
}
/**
 * 拼团购买跳转至订单页面
 * @param groupId
 */
export function grouppurchase({specId,groupItemId,groupDetailId,goodsNumber}) {
    return fetch.get('group/api/purchase', {
        specId,
        groupItemId,
        groupDetailId,
        goodsNumber

    });
}

/**
 * 个人中心我的拼团
 * @param groupId
 */
export function myGroupList({orderState,pageNo,pageSize}) {
    return fetch.get('group/api/member/list', {
        orderState,
        pageNo,
        pageSize
    })
}
/**
 * 拼团订单
 * @param addressId specId groupItemId shippingFee
 */
export function grouporder({addressId,specId,groupItemId,groupDetailId,goodsNumber,invoiceId,shippingFee,remark}) {
    return fetch.get('group/api/order',{
        addressId,
        specId,
        groupItemId,
        groupDetailId,
        goodsNumber,
        invoiceId,
        shippingFee,
        remark
    });
}

/**
 * 当前拼团已支付用户信息
 * @param addressId specId groupItemId shippingFee
 */
export function itemDetail({groupDetailId}) {
    return fetch.get('group/api/itemDetail',{
        groupDetailId
    });
}