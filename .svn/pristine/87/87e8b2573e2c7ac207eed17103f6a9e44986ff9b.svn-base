import React, {Component} from 'react';
import {Img} from 'commonComponent';
import {common} from 'common';
import {List, Flex, ActionSheet} from 'antd-mobile';
// import '../components/css/pointGoods.less'
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
        const {data} = this.props;
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
        const {data} = this.props;
        return <div className="points_confirmechange">
            <Flex justify="between" style={{padding: '0 0.2rem'}}>
                <List.Item style={{flex: 1, minWidth: '1.65rem'}} onClick={() => console.log()}
                           className="redeeNow_img">
                    <Img src={data.pgoodsImage} className="img" width="100%"/>
                </List.Item>
                <List.Item style={{flex: 3}} onClick={() => console.log()}>
                    <div className="reddemNow_name">{data.pgoodsName}</div>
                    <Flex justify="between">
                        <List.Item style={{flex: 3}}>
                            <div className="redeeNow_weight">250KG</div>
                            <div className="redeeNow_integral">数量：{data.pgoodsChoosenum}</div>
                        </List.Item>
                        <List.Item style={{flex: 2}}>
                            <div className="redeeNow_jifen">{data.pgoodsPoints}积分</div>
                        </List.Item>
                    </Flex>
                </List.Item>
            </Flex>
        </div>
    }
}

export default Shop;
