import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex, ActionSheet,Button } from 'antd-mobile';
// import Button from "antd-mobile/lib/button/index.d";

const Item = List.Item;
const Brief = Item.Brief;

class ShopSuccess extends Component {
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
    let showShip = null;
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
    }

    return <List className='wx-order-shop' renderHeader={<div><img src="./assets/img/weiqing/dianpu-01@2x.png" style={{width:'0.28rem',height:'0.28rem',paddingRight:'0.18rem'}}/>卫青健康</div>}>
      {
        data.list.map((item,index) => {
          const showShip = null
          return <div key={index}><Item
            multipleLine style={{padding:'0.2rem 0rem 0.2rem 0.26rem',borderBottom: '1px solid #e5e5e5'}}>
            <Flex className="order-shop-project">
              <Img src={item.goodsImages} style={{height:'162px',width:'162px'}}/>
              <div className="shop-list-box">
                <div className="shop_name">产品名称</div>
                <div className="shop_product">产品介绍</div>
                <div style={{fontSize:'0.26rem',color:'#666'}}>数量: {item.goodsNum}</div>
                <div style={{color:'#e9331e',fontSize:'0.3rem'}}>¥{item.goodsPrice}</div>
              </div>  
            </Flex>
          </Item>
          </div>  
        })
      }
      {/*<Item onClick={this.showShipSelect} extra={showShip}>fenyong</Item>*/}
      <Flex justify="end" style={{padding:'0.2rem 0.26rem'}}>
        <Button inline type="primary" style={{height:'0.6rem',lineHeight:'0.6rem',background:'#00a9e0',borderColor:'#00a9e0',fontSize:'0.28rem'}}>联系客服</Button>
      </Flex>
    </List>
  }
}

export default ShopSuccess;
