import qs from 'qs';
import {getFullUrl, getUserId, getVerifyCode, isApp} from './common';
import fetch from 'isomorphic-fetch';
import React from 'react';
import {Modal,Popup} from 'antd-mobile';
import {common} from 'common';
import {getSign} from 'common/doSign';
import Loading from './components/Loading'
// import Encrypt from 'jsencrypt';

var whiteInterface = [
    '/orderapi/saveorder',
    '/bargain/api/bargain',
    '/orderapi/getOrderPay',
    '/api/pointsgoods/saveCart',
    '/api/pointsgoods/pointCart',
    '/api/pointsgoods/orderdetail',
    '/cartapi/addCart',
    '/cartapi/subToOrder',
    '/api/saveAddress',
    '/wxpay/api/pay',
    '/bargain/api/bargain',
    '/bargain/api/bargainPurchase',
    '/group/api/purchase',
    '/raise/api/order',
];

var checkURI;

function checkApi(url) {
    let result=false;
    whiteInterface.forEach(function (item) {
        if(url.indexOf(item)>-1){
            result=true
        }
    });
    return result;
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response.text()
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function parseJSON(response) {
    const json = JSON.parse(response);
    // check 通用错误码
    if (json.result == 0) {
        if (json.errorCode == 403 || json.msg.indexOf('您尚未登录或登录时间过长')>0) {
//       Modal.alert('', <div style={{lineHeight:'0.7rem'}}>{json.msg}</div>, [{
//         text: '去登录',
//         onPress: () => {
//           common.gotoLoginAndBack();
// //        setCookie('token', "", -1);
//           common.delete_cookie('token');
//           localStorage.removeItem('token');
//         }
//       },{
//       	text: '取消',
//         close: () => {
// //      setCookie('token', "", -1);
//         common.delete_cookie('token');
//        	localStorage.removeItem('token');
//         }
//       }])
            const backUrl1 = localStorage.getItem('backUrl');
            if (backUrl1) {
                localStorage.setItem('history', backUrl1);
            }
            localStorage.setItem('backUrl', location.href);
            setTimeout(100,window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx23642d83b743fbf5&redirect_uri=http://mall.vitaqin.com/thirdlogin/access&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec")
            return
        }
    }
    if(checkApi(checkURI)){
        Popup.hide(<Loading showState={true}/>)
    }
    return json;
}

export function get(requestUrl, params) {
    const baseParams = {
        timestamp: new Date().getTime()
    };
    const token = localStorage.getItem('token');
    if (token) {
        params = {
            ...baseParams,
            ...params,
            token: token
        }
    } else {
        params = {
            ...baseParams,
            ...params
        }
    }
    let url = getFullUrl(requestUrl);
    if (params) {
        //url = url + "?" + qs.stringify(params) + "&sign=" + getSign(params);
        url = url + "?" + qs.stringify(params);
    }

    // var encrypt = new JSEncrypt();
    // encrypt.setPublicKey($('#pubkey').val());
    // var encrypted = encrypt.encrypt($('#input').val());

    let headers = {}
    checkURI=url
    if(checkApi(url)){
        Popup.show(<Loading showState={false}/>)
    }
    return fetch(url, {
        headers,
        // credentials: 'include',
    }).then(checkStatus)
        .then(parseJSON);
}

export function post(requestUrl, params) {
    const baseParams = {
        timestamp: new Date().getTime()
    }

    let url = getFullUrl(requestUrl);
    const token = localStorage.getItem('token');
    params = {
        ...params,
        ...baseParams
    }
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    if (token) {
        headers['token'] = token;
    }
    return fetch(url, {
        method: "POST",
        headers,
        // credentials: 'include',
        body: qs.stringify(params),
    }).then(checkStatus).then(parseJSON);
}

export function upload(requestUrl, data) {
    const baseParams = {
        timestamp: new Date().getTime()
    }
    const token = localStorage.getItem('token');
    let formData = new FormData();
    if (Array.isArray(data.images)) {
        data.images.forEach(function (element) {
            formData.append('images', element);
        });
    } else {
        formData.append('images', data.images)
    }
    let url = getFullUrl(requestUrl);
    if (token) {
        url = url + "?token=" + token;
    }

    return fetch(url, {
        method: 'POST',
        // headers,
        body: formData
    }).then(checkStatus).then(parseJSON);

    // return fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   credentials: 'include',
    //   body: qs.stringify(params),
    // }).then(checkStatus).then(parseJSON);
}
