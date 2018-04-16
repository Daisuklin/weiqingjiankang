import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex, ActionSheet } from 'antd-mobile';
import './ShopSpell.less'
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
    renderHeader = () =>{
    return<div>
      <img src="./assets/img/weiqing/dianpu-01@2x.png" width="28px" height="28px" /><span style={{paddingLeft:'0.1rem'}}>卫青健康平台</span>
    </div>
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

    return <List className='wx-order-shop' renderHeader={this.renderHeader}>
      {
        data.list.map((item,index) => {
          const showShip = null
          return <div key={index} className="orderlist"><Item
            onClick={()=>this.gotoGoodsDetail(item)}
            multipleLine>
            <Flex style={{paddingBottom:'0.2rem'}} justify="between">
              <Flex.Item style={{flex:1}}>
                <Img src={item.goodsImages} style={{height:'130px',width:'162px'}}/>
              </Flex.Item>
              <Flex.Item style={{flex:3}}>
                <div style={{width:'100%'}}>
                  <div className="goodsname">{item.goodsName}</div>
                  <div className="goodsproduct">{item.goodsName}</div>
                  <div style={{overflow:'hidden'}}>
                    <Brief style={{fontSize:'0.3rem',color:'#e60012',float:'left'}}>¥{item.goodsPrice}</Brief>
                    <Brief style={{color:'red',fontSize:'0.24rem',color:'#333',float:'right'}}>x{item.goodsNum}</Brief>
                  </div>

                </div>
              </Flex.Item>

            </Flex>
          </Item>
          </div>  
        })
      }
      {/*<Item onClick={this.showShipSelect} extra={showShip}>&nbsp;</Item>*/}
    </List>
  }
}

export default Shop;
