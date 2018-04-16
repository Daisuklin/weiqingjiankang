import { fetch, common } from 'common';

// 浏览店铺记录
export function storeBrowseSaveOrUpdate({ storeId }) {
  return fetch.get('/storeapi/storeBrowseSaveOrUpdate', {
    storeId
  });
}

// 店铺首页信息
export function storedetail({ storeId }) {
  return fetch.get('/storeapi/storedetail', {
    storeId
  });
}

// 关注店铺/商品
export function storecollection({
  favType,
  goodsId,
  storeId
}) {
  return fetch.get('/storeapi/storecollection', {
    favType,
    goodsId,
    storeId,
  });
}

/**
 * 店铺商品
 * @param pageNo
 * @param pageSize
 * @param storeId
 * @param goodsName
 * @param goodsType
 * @param storeClassId
 * @param order
 * @param orderField
 */
export function storegoods({
  pageNo,
  pageSize,
  storeId,
  goodsName,
  goodsType, storeClassId,
  order,
  orderField
}) {
  return fetch.get('/storeapi/storegoods', {
    pageSize,
    storeId,
    pageNo,
    goodsName,
    goodsType,
      storeClassId,
    order,
      orderField
  });
}


export function storeClassList({storeId}) {
    return fetch.get('/storeapi/storeclass', {
        storeId
    });
}


export function couponlist({
  storeId
}) {
  return fetch.get('/storeapi/couponlist', {
    storeId
  });
}

// 领券
export function receiveCoupon({ couponId, storeId }) {
  return fetch.get('/storeapi/receiveCoupon', { couponId, storeId });
}
