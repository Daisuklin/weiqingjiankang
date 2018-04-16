import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox,
    WhiteSpace
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as addressApi from '../../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
const Brief = Item.Brief;
const AgreeItem = Checkbox.AgreeItem;

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }

  initAddressList = () => {
    addressApi.addressList().then(result => {
      if (result.result == 1) {
        this.setState({
          addressList: result.data
        })
      }
    })
  }

  componentDidMount() {
    this.initAddressList();
  }

  gotoAdd = () => {
    this.props.router.push('/addressAdd')
  }

  gotoEdit = (address) => {
    this.props.router.push({
      pathname: '/addressEdit',
      state: address
    });
  }

  gotoDel = (address) => {
    Modal.alert('删除', '确定删除地址么???', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          addressApi.delAddress(address.addressId).then(result => {
            if (result.result == 1) {
              this.setState({
                  addressList: []
              })
            }
            Toast.info(result.msg);
            this.initAddressList();
          })
        },
        style: { fontWeight: 'bold' }
      },
    ])
  }

  setDefault = (address) => {
    addressApi.updateAddressDef(address.addressId).then(result => {
      if (result.result == 1) {
        this.initAddressList();
      }
    })
  }

  render() {
    const { addressList } = this.state;
    return <div className='wx-addresslist fix-scroll hastitle'>
      <div style={{marginBottom:'1.1rem'}}>
          {
              addressList.map(address => {
                  return <List key={address.addressId} className="wx-addresslist-content">
                    <Item multipleLine className="am-list-item1">
                      <div style={{fontSize:'0.24rem',color:'#333'}}>{address.trueName} &nbsp;&nbsp;&nbsp;&nbsp; {address.mobPhone} </div>
                      <Brief style={{fontSize:'0.24rem',color:'#999'}}>{address.areaInfo} {address.address}</Brief>
                    </Item>
                    <Item className="am-list-item2">
                      <Flex>
                        <Flex.Item>
                          <AgreeItem checked={address.isDefault==1} onChange={() => this.setDefault(address)}>
                            设置默认
                          </AgreeItem>
                        </Flex.Item>
                        <Flex.Item style={{textAlign:'right'}}>
                          <Button type='primary' size='small' onClick={()=>this.gotoEdit(address)} inline style={{background:'none',border:'none',fontSize:'0.22rem',color:'#808080'}}>
                            <img src="./assets/img/weiqing/bianji@2x.png" style={{width:'22px', height:'22px',paddingRight:'0.1rem',paddingBottom:'3px'}}/>编辑
                          </Button>&nbsp;
                          <Button type='primary' size='small' onClick={()=>this.gotoDel(address)} inline style={{background:'none',border:'none',fontSize:'0.22rem',color:'#808080'}}>
                            <img src="./assets/img/weiqing/shanchu@2x.png" style={{width:'16px', height:'20px',paddingRight:'0.1rem',paddingBottom:'3px'}}/>删除</Button>
                        </Flex.Item>
                      </Flex>
                    </Item>
                    <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>
                  </List>
              })
          }
      </div>

      <div className='wx-addresslist-bar'>
        <Button type='primary' onClick={this.gotoAdd} style={{height:'0.7rem',borderRadius:'3px',margin:'0px 0.26rem',lineHeight:'0.65rem',backgroundColor:'#00a9e0',borderColor:'#00a9e0'}}>新增地址</Button>
      </div>
    </div>
  }
}

export default withRouter(Address);
