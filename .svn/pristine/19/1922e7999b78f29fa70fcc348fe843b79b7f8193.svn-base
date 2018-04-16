import { fetch, common } from 'common';

/**
 * 查询首页 数据
 */
export function queryIndexData() {
  return fetch.get('/floor/api/indexListAll', {
    apKey: 'advh5'
  });
}

export function hostList() {
    return fetch.get('/hot/api/index', {});
}

//首页秒杀
export function timeBuyList({ }) {
    return fetch.post('/qingGou/api/list', {
    });
}