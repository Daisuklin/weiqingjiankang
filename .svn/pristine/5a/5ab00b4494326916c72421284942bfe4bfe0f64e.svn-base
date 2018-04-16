import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex, ActionSheet } from 'antd-mobile';
import '../components/css/pointGoods.less'
const Item = List.Item;
const Brief = Item.Brief;

class Shop extends Component {
    constructor(props) {
        super(props);
    }

    gotoGoodsDetail = (item) => {
        common.gotoGoodsDetail({
            specId: item.specId
        });
    }

    showShipSelect = () => {
        const { data } = this.props;
        let showShip = null;
        if (!data || !data.shipPrice) {
            return;
        }

        let keys = Object.keys(data.shipPrice);
        const BUTTONS = Object.keys(data.shipPrice).map((key, index) => {
            if (key == 'kd') {
                return '快递'
            } else if (key == 'py') {
                return '平邮'
            } else {
                return '其他'
            }
        })
        BUTTONS.push('取消')

        console.log(keys);

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
            },
            (buttonIndex) => {
                console.log(buttonIndex);
                if (buttonIndex == BUTTONS.length - 1) {
                    return;
                }
                this.props.updateShip({
                    storeId: data.storeId,
                    shipType: keys[buttonIndex]
                })
            });
    }

    render() {
        const { data } = this.props;
        console.log(data);
      /*  let showShip = null;
       if (data && data.shipPrice) {
       const shipPrice = data.shipPrice;
       const selectedShip = data.selectedShip;
       if (shipPrice && Object.keys(shipPrice).length > 0) {
       if (selectedShip == 'kd') {
       showShip = '快递:' + shipPrice[selectedShip]
       } else if (selectedShip == 'py') {
       showShip = '平邮:' + shipPrice[selectedShip]
       } else {
       // showShip = '';
       }
       } else {
       showShip = '免运费'
       }
       }*/
        return <div className="points_confirmechange">
            {
                data.list.map((item,index) => {
                    const showShip = null
                    return <div key={index}>
                      <Flex justify="between" style={{padding:'0 0.2rem'}}>
                        <List.Item style={{flex:1,minWidth:'1.65rem'}} onClick={()=>console.log(PointsGoods)} className="redeeNow_img">
                          <Img src={item.goodsImages} className="img" width="100%"/>
                        </List.Item>
                        <List.Item style={{flex:3}} onClick={()=>console.log(PointsGoods)}>
                          <div className="reddemNow_name">埃里克的罚款撒的发生的</div>
                          <div className="reddemNow_product">埃里克的罚款撒的发生的</div>
                          <Flex justify="between">
                            <List.Item style={{flex:3}}>
                              <div className="redeeNow_weight">250KG</div>
                              <div className="redeeNow_integral">数量：x{item.goodsNum}</div>
                            </List.Item>
                            <List.Item style={{flex:2}}>
                              <div className="redeeNow_jifen">1000积分</div>
                            </List.Item>
                          </Flex>
                            {/*<List.Item extra={<Stepper style={{ width: '100%', minWidth: '2rem' }} showNumber size="small" defaultValue={20} />}>预定人数</List.Item>*/}
                        </List.Item>
                      </Flex>
                    </div>
                })
            }
        </div>
    }
}

export default Shop;
