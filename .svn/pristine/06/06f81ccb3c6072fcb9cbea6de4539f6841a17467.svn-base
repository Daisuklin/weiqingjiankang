import { fetch, common } from 'common';
// import areaData from './area';



//绑定条形码
export function bindBarCode({barCode}) {
    return fetch.get('gene/api/barcodeDetection',{
        barCode
    })
}

// 个人中心信息填写
export function geneReport({barCode,receiverName,mobileNumber,sex,birthday,nation,height,weight,nationality,email,placeOfOrigin,diseaseHistory}) {
    return fetch.get('gene/api/CompleteInformation', {
        barCode,
        receiverName,
        mobileNumber,
        sex,
        birthday,
        nation,
        height,
        weight,
        nationality,
        email,
        placeOfOrigin,
        diseaseHistory
    })
}
//基因检测报告查询
export function selectReport({barCode,userName}) {
    return fetch.get('gene/api/barcodeDetection',{
        barCode,
        userName
    })
}
//基因检测报告下载接口
export function geneReportDownloadr({order_id}) {
    return fetch.get('gene/api/viewReport',{
        order_id
    })
}


//个人中心-我的基因检测
export function genePersonalCenter({orderState	,pageNo,pageSize}) {
    return fetch.get('gene/api/genePersonalCenter',{
        orderState,
        pageNo,
        pageSize
    })
}
//个人中心-基因检测报告查询
export function geneselectReport({barcode	,userName}) {
    return fetch.get('gene/api/selectReport',{
        barcode,
        userName
    })
}
//个人中心-基因检测订单状态列表
export function getOrderState({activeCode	,barcode,userName,taskId,state,page,pageSize,sort }) {
    return fetch.get('gene/api/getOrderState',{
        activeCode,
        barcode,
        userName,
        taskId,
        state,
        page,
        pageSize,
        sort
    })
}


// export function verifyCode({ mobile }) {
//     return fetch.get('/floor/api/verifyCode', {
//         mobile
//     });
// }

