import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List,
  Modal,
    ActionSheet
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';
import './cashiercom.less'

const Item = List.Item;
const prompt = Modal.prompt;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


class Cashier extends Component {
  constructor(props) {
    super(props);
      this.state = {
          clicked: 'none',
          clicked1: 'none',
          clicked2: 'none',
      };
  }

  gotoPay = (type) => {
    if (type == 1) {
//    Modal.alert('微信支付..开发中');

      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/payConfirm/'+this.props.params.orderCode+'/'+this.props.params.totalPrice+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
	  //跳到确认支付页面
	  this.props.router.push(`/payConfirm/${this.props.params.orderCode}/${this.props.params.totalPrice}`);

	}else if(type==2){
      orderApi.toAliH5pay({
				orderCode:this.props.params.orderCode
			}).then(r => {
					alert(r)
	       if (r.result == 1) {
	       		alert(1)
	       } else {
	         alert(r.msg);
	       }
	     })
    }else if(type==4){
    	console.log(this.props)
    	prompt(
        '请输入支付密码',
        '', [{ text: '取消' }, {
          text: '提交',
          onPress: passwd => {
              if(passwd.length != 6 ){
                  Toast.info('请输入六位数的密码');
              }else{
                  orderApi.chkPasswd({ passwd }).then(result => {
                      if (result.result == 1) {
                          // 密码正确，继续提交订单
                          orderApi.saveorder({
                              cartIds: cartId,
                              addressId: selectedAddress.addressId,
                              paytype:1,
                              freight,
                              couponId,
                              invoiceId: invoice ? invoice.id : null,
                              isPd:1,
                              activityIds: null
                          }).then(result => {
                              if (result.result == 1) {
                                  // 余额数大于 订单支付额
                                  // console.log(priceData);
                                  if (parseFloat(priceData.totalPrice) == 0) {
                                      console.log('支付成功，跳转到成功页面');
                                      this.props.router.replace('/paySuccess/' + result.data[0].paySn);
                                  }
                              }
                          });
                      } else {
                          Toast.fail(result.msg);
                      }
                  })
              }

          }
        }],
        'secure-text',
      )
    }
  }
  /*  showActionSheet = () => {
        const TEXT = [<div className="keyword1"></div>,
            <div className="keyword2"></div>,
            <div className="keyword3"></div>,
            <div className="keyword4"></div>,
            <div className="keyword5"></div>,
            <div className="keyword6"></div>,
            <div className="keyword7"><img src="./assets/img/weiqing/guanbi-02@2x.png" style={{width:'0.21rem',height:'0.2rem'}}/></div>];
        ActionSheet.showActionSheetWithOptions({
                options: TEXT,
                cancelButtonIndex: TEXT.length - 1,
                destructiveButtonIndex: TEXT.length - 2,
                message: '请输入支付密码',
                maskClosable: true,
                'data-seed': 'logId',
                wrapProps,
            },
            (buttonIndex) => {
                this.setState({ clicked: TEXT[buttonIndex] });
            });
    }*/
  render() {
    const totalPrice = this.props.params.totalPrice;

      const IconClass = ({ url }) => {
          return <div style={{
              width: '0.45rem',
              height: '0.45rem',
              background: `url(${url}) center center /  0.45rem 0.45rem no-repeat`,
              display:'inline-block',
              marginRight:'0.1rem'
          }}
          />
      }

    const imgUrl = ['./assets/img/WechatIMG96.png',
      './assets/img/WechatIMG97.png',
      './assets/img/WechatIMG98.png',
      './assets/img/mine_order.png'
    ];
    let headerContent = '';
    // 充值订单
    if (this.props.params.orderCode.startsWith('R')) {
      headerContent = `充值金额为¥${totalPrice}!`
    } else {
      // headerContent = `当前订单金额为¥${totalPrice}!`
        headerContent  =()=>{
            return <Flex justify="between">
                <div style={{fontSize:'0.28rem',color:'#333'}}>订单金额</div>
                <div style={{fontSize:'0.28rem',color:'#fc0301'}}>¥{totalPrice}</div>
            </Flex>
        }
    }
    return <List renderHeader={headerContent} className="cashier_list">
        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
      <Item thumb={<IconClass url={imgUrl[0]}></IconClass>} arrow='horizontal' onClick={()=>this.gotoPay(1)} className="cashier_list_item">微信支付</Item>
	{/*<Item thumb={<IconClass url={imgUrl[1]}></IconClass>} arrow='horizontal' onClick={()=>this.gotoPay(2)}>支付宝支付</Item>*/}
      {/*<Item thumb={<IconClass url={imgUrl[2]}></IconClass>} arrow='horizontal' onClick={()=>this.gotoPay(3)}>银联支付</Item>*/}
        {this.props.params.orderCode.startsWith('R') ? '':
            <Item thumb={<IconClass url="./assets/img/weiqing/yuezhifu@2x.png"></IconClass>} arrow='horizontal' onClick={()=>this.gotoPay(4)}>余额支付</Item>}
        {/*<Item thumb={<IconClass url="./assets/img/weiqing/yuezhifu@2x.png"></IconClass>} arrow='horizontal' onClick={()=>this.showActionSheet()}>余额支付</Item>*/}
    </List>
  }
}

export default withRouter(Cashier);
