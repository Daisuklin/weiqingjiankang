import { fetch, common } from 'common';

// 订单列表
export function orderlist({
  status,
  pageNo,
  orderType,
 pageSize
}) {
  return fetch.get('/orderapi/orderlist', {
    status,
    pageNo,
    orderType,
      pageSize
  });
}

export function orderdetail({
  orderid
}) {
  return fetch.get('/orderapi/orderdetail', {
    orderid
  });
}


// 取消订单
export function cancleorder({
  ordersn
}) {
  return fetch.get('/orderapi/cancleorder', {
    ordersn
  });
}

// 完成订单
export function finishorder({
  ordersn
}) {
  return fetch.get('/orderapi/finishorder', {
    ordersn
  });
}


// http://testbbc.leimingtech.com/orderapi/refundOrder
// refundAmount	158.00
// sign	aO6ElFJ/XdlU6xra9SuG0EvRQIv2wjPm4cRXW7lR92E/B50xToNCSyUSgEXeqhYGmAntazjdCsAm2GI+nmsL0s/asMEmJSRQpcEbO45JeJlFPCjftrlUAVtkke2zOSOZb4Y9sKjdLvfnK0+QOLkczqEQ0zOGY5a22iDPfkpC2dQ=
// imgUrl	/upload/img/store/goods/1491245264552.jpg
// buyerMessage	1111111
// orderGoodsId	8388de3f7a6f462b8bbff4173f644818
// orderId	b28c3b687b1541e8a4cdfcfe62671d25

// 退款申请
export function refundOrder({
  refundAmount,
  imgUrl,
  buyerMessage,
  orderGoodsId,
  orderId
}) {
  return fetch.get('/orderapi/refundOrder', {
    refundAmount,
    imgUrl,
    buyerMessage,
    orderGoodsId,
    orderId
  });
}

// 退货
export function returnOrder({
  imgUrl,
  buyerMessage,
  orderGoodsId,
  goodsNum,
  orderId
}) {
  return fetch.get('/orderapi/returnOrder', {
    imgUrl,
    buyerMessage,
    orderGoodsId,
    goodsNum,
    orderId
  });
}

// 换货
export function barterOrder({
  imgUrl,
  buyerMessage,
  orderGoodsId,
  goodsNum,
  orderId
}) {
  return fetch.get('/orderapi/barterOrder', {
    imgUrl,
    buyerMessage,
    orderGoodsId,
    goodsNum,
    orderId
  });
}

// 文件上传
export function filesUpload({
  images
}) {
  console.log(images);
  return fetch.upload('/memberapi/filesUpload', {
    images
  });
}

// 提交回复
export function saveReviews({
  gevalIsAnonymous,
  gevalScore,
  gevalContent,
  sevalDeliverycredit,
  sevalDesccredit,
  recId,
  imgUrl,
  sevalServicecredit,
  orderSn
}) {
  return fetch.get('/reviews/api/saveReviews', {
    gevalIsAnonymous,
    gevalScore,
    gevalContent,
    sevalDeliverycredit,
    sevalDesccredit,
    recId,
    imgUrl,
    sevalServicecredit,
    orderSn
  });
}

// 退款退货列表
export function returnList({
  pageNo,
  pageSize
}) {
  return fetch.get('/orderapi/returnList', {
    pageNo,
    pageSize
  });
}

// 退款退货明细
export function returnDetail({
  refundId
}) {
  return fetch.get('/orderapi/returnDetail', {
    refundId
  });
}

// 换货列表
export function barterList({
  pageNo,
  pageSize
}) {
  return fetch.get('/orderapi/barterList', {
    pageNo,
    pageSize
  });
}

// 换货明细
export function barterDetail({
  barterId
}) {
  return fetch.get('/orderapi/barterDetail', {
    barterId
  });
}

// 退货
export function returnDelivery({
  invoiceNo,
  expressName,
  refundId
}) {
  return fetch.get('/orderapi/returnDelivery', {
    invoiceNo,
    expressName,
    refundId
  });
}

// 换货
export function barterDelivery({
  invoiceNo,
  expressName,
  barterId
}) {
  return fetch.get('/orderapi/barterDelivery', {
    invoiceNo,
    expressName,
    barterId
  });
}

export function finishBarter({
  barterId
}) {
  return fetch.get('/orderapi/finishBarter', {
    barterId
  });
}
// http: //testbbc.leimingtech.com/orderapi/finishBarter
