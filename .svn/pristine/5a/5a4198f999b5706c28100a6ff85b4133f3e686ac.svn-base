import React, {Component} from 'react'
import {
    List,
    Tabs,
    WingBlank,
    Flex,
    WhiteSpace,
    Button
} from 'antd-mobile';
import {common} from 'common';
import {Img} from 'commonComponent';
const TabPane = Tabs.TabPane;

const gotoStore = (goodsDetailInfo) => {
    common.gotoStore({storeId: goodsDetailInfo.storeId});
}

/**
 * 商品更多信息
 * @param {*} param0
 */
export default function ({goodsDetailInfo}) {
    return <WingBlank style={{padding: '0.2rem 0px'}}>
        <Flex >
            <Flex.Item style={{flex: 1}}>
                <Img src={goodsDetailInfo.storeLogo} style={{width: '100%', height: '0.7rem'}}></Img>
            </Flex.Item>
            <Flex.Item style={{flex: 2}}>
                <Flex>
                    <Flex.Item style={{flex: 2}}>
                        <div><span style={{fontSize:'0.26rem',color:'#252525'}}>{goodsDetailInfo.storeName}</span><br/><span
                            style={{color: '#9c9c9c', fontSize: '0.22rem'}}>正品行货，欢迎选购！</span></div>
                    </Flex.Item>
                    <Flex.Item style={{flex: 1}}>
                        <div style={{color: '#999', textAlign: 'right'}}>{goodsDetailInfo.averageCredit}</div>
                    </Flex.Item>
                </Flex>
            </Flex.Item>
        </Flex>
        <WhiteSpace></WhiteSpace>
        <Flex>
            <Flex.Item>
                <Flex direction='column'>
                    <Flex.Item
                        style={{color: '#9c9c9c', fontSize: '0.24rem'}}>商品{goodsDetailInfo.descCredit}</Flex.Item>
                    <Flex.Item
                        style={{padding: '0.24rem 0px', color: '#e9321f',fontSize: '0.24rem'}}>{goodsDetailInfo.storeCollect}</Flex.Item>
                    <Flex.Item style={{color: '#9c9c9c', fontSize: '0.24rem'}}>关注人数</Flex.Item>
                </Flex>
            </Flex.Item>
            <Flex.Item>
                <Flex direction='column'>
                    <Flex.Item
                        style={{color: '#9c9c9c', fontSize: '0.24rem'}}>服务{goodsDetailInfo.serviceCredit}</Flex.Item>
                    <Flex.Item
                        style={{padding: '0.2rem 0px', color: '#e8321d',fontSize: '0.24rem'}}>{goodsDetailInfo.storeGoodsCount}</Flex.Item>
                    <Flex.Item style={{color: '#9c9c9c', fontSize: '0.24rem'}}>全部商品</Flex.Item>
                </Flex>
            </Flex.Item>
            <Flex.Item>
                <Flex direction='column'>
                    <Flex.Item
                        style={{color: '#9c9c9c', fontSize: '0.24rem'}}>物流{goodsDetailInfo.deliveryCredit}</Flex.Item>
                    <Flex.Item style={{padding: '0.2rem 0px', color: '#e8321d',fontSize:'0.24rem'}}>149</Flex.Item>
                    <Flex.Item style={{color: '#9c9c9c', fontSize: '0.24rem'}}>店铺动态</Flex.Item>
                </Flex>
            </Flex.Item>
        </Flex>
        <WhiteSpace size="md"></WhiteSpace>
        {
            goodsDetailInfo.storeId != "0" && <Flex>
                <Flex.Item><Button style={{
                    height: '0.58rem',
                    lineHeight: '0.58rem',
                    fontSize: '0.24rem',
                    color: '#9d9c9c',
                    borderRadius: '0px',
                    background: 'url(./assets/img/weiqing/kefu@2x.png) no-repeat 0.85rem center'
                }}>联系客服</Button></Flex.Item>
                <Flex.Item><Button onClick={() => gotoStore(goodsDetailInfo.storeId)} style={{
                    height: '0.58rem',
                    lineHeight: '0.58rem',
                    fontSize: '0.24rem',
                    color: '#9d9c9c',
                    borderRadius: '0px',
                    background: 'url(./assets/img/weiqing/dianpu-02@2x.png) no-repeat 0.85rem center'
                }}>进入店铺</Button></Flex.Item>
            </Flex>
        }
    </WingBlank>
}
