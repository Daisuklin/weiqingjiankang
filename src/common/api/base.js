import { fetch, common } from 'common';

/**
 * 微信签名
 * @param pageUrl
 */
export function getToken({pageUrl}) {
    return fetch.get('/weChatApi/jsToken', {pageUrl});
}