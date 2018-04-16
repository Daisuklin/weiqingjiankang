import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List,
    Popup,
    Modal
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/pointsGoods';
import './pointsOrderDetail.less'
const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;
class OrderDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderDetail: null,
        orderaddress:null
    }
  }

  componentDidMount() {
    const orderId = this.props.params.id;
    orderApi.orderdetail({
        orderId
    }).then(result => {
      if (result.result == 1) {
        const data =result.data[0];
        this.setState({
          orderDetail: data.shopPointsOrder,
            orderaddress:data.orderaddress
        });
      }
    })
  }

  getStatusShowText = (status) => {
    const orderStatus = {
      '0': '已取消',
      '10': '待支付',
      '20': '已确认',
      '30': '已兑换并扣除积分',
      '40': '已发货',
      '50': '已收货',
      '60': '已完成',
    }
    return orderStatus[status]
  }

  render() {
    const { orderDetail,orderaddress } = this.state;
    if (orderDetail==null) {
      return null;
    }
    return (
      <div className="wx-pointsorderDetail">
        <List className="order-list-content">
          <Item
                extra={<div>{this.getStatusShowText(orderDetail.pointOrderstate)}</div>}
                multipleLine>
            <div style={{padding:'0.2rem 0px'}} className="item_list">
              <Flex justify="between" >
                <span className="item_list_name">订单号：{orderDetail.pointOrdersn}</span>
                  {/*<div className="item_list_protime">请于28分35秒内付款，超时订单自动关闭</div>*/}
              </Flex>
            </div>
          </Item>

          <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
          <Item
                multipleLine style={{background: 'url(./assets/img/weiqing/dizhi-02@2x.png) 0px bottom /100% 10px no-repeat'}}>
              <div style={{padding:'0.2rem 0px'}}>
                    <Flex justify="between" >
                      <Flex.Item style={{flex:0.2}}>
                        <img src="./assets/img/weiqing/dizhi-01@2x.png" style={{width:'25px',height:'35px'}}/>
                      </Flex.Item>
                      <Flex.Item style={{flex:3,marginLeft:'0px'}}>
                        <span>{orderaddress.pointTruename} &nbsp;&nbsp;</span>
                        <Brief>{orderaddress.pointAreainfo} {orderaddress.pointAddress}</Brief>
                      </Flex.Item>
                    </Flex>
                  </div>

          </Item>
        </List>
        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
        <div>
          <List className='wx-order-shop' renderHeader={<div>卫青健康</div>}>
              {
                  orderDetail.orderGoodsList.map((goods,index) => {
                      // const showShip = null
                      return <div key={index}><Item
                          multipleLine style={{padding:'0.2rem 0.26rem 0.2rem 0.26rem',borderBottom: '1px solid #e5e5e5'}}>
                        <Flex key={goods.pointGoodsid} onClick={() => {
                            common.gotoPointsGoodsDetail({
                                pointsGoodsId:goods.pointGoodsid
                            })
                        }}>
                          <div style={{ width: '1.5rem', height: '1.5rem' }}><Img src={goods.pointGoodsimage}
                               style={{ width: '1.5rem', height: '1.5rem' }} /></div>
                          <div className="shop-list-box">
                            <div className="shop_name" >{goods.pointGoodsname}</div>
                            {/*<div className="shop_product">产品介绍</div>*/}
                            <div style={{fontSize:'0.26rem',color:'#666'}}>数量: {goods.pointGoodsnum}</div>
                            <div style={{color:'#e9331e',fontSize:'0.3rem'}}>积分:{goods.pointGoodspoints}</div>
                          </div>
                        </Flex>
                      </Item>
                      </div>
                  })
              }
            {/*<Flex justify="end" style={{padding:'0.2rem 0.26rem'}}>*/}
              {/*<Button inline type="primary" style={{height:'0.6rem',lineHeight:'0.6rem',background:'#00a9e0',borderColor:'#00a9e0',fontSize:'0.28rem'}}>联系客服</Button>*/}
            {/*</Flex>*/}
          </List>
          <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>

        </div>
{/*        <Flex>
          <Flex.Item style={{flex:2.5,borderRight: '1px solid #ddd'}}>
            <List className="extrared">
              <Item extra={orderDetail.pointAllpoint+'积分'}>共需积分</Item>
              <Item extra={`+ ¥100.00`}>运费</Item>
              <Item extra={`- ¥100.00`}>抵用券</Item>
              <Item extra={`- ¥100.00`}>优惠促销</Item>
            </List>
          </Flex.Item>
        </Flex>*/}

        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
        <Flex>
          <Flex.Item style={{ background:'#fff',padding:'0.3rem 0.26rem',width:'100%',marginLeft:'0px'}}>
            <div className="order_all">
              <div className="order_all_price" >合计： <span style={{fontSize:'0.28rem',color:'#e2536b'}}>{orderDetail.pointAllpoint}积分</span></div>
              <div className="order_all_data" >下单时间：{orderDetail.pointAddtimeStr}</div>
            </div>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}

export default withRouter(OrderDetail);
