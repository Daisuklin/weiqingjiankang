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
  InputItem,
  Picker
} from 'antd-mobile';

import * as addressApi from '../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
const district = addressApi.getAreaData();

class AddressEdit extends Component {
  constructor(props) {
    super(props);
    this.state={
    	sty:false,
    	sty1:false
    }
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      ...this.props.location.state,
      areaIds: [
        this.props.location.state.provinceId,
        this.props.location.state.cityId,
        this.props.location.state.areaId
      ]
    });
  }

  onSubmit = () => {
    // 提交地址
    const fieldsValue = this.props.form.getFieldsValue()
    // check
    if (!fieldsValue.trueName || fieldsValue.trueName == '') {
      Toast.info('收货人姓名不能为空');
      return;
    }
    console.log(fieldsValue.mobPhone.length)
    if (!fieldsValue.mobPhone || fieldsValue.mobPhone.trim() == '') {
      Toast.info('手机号不能为空');
      return;
    }else if(fieldsValue.mobPhone.length!=13||fieldsValue.mobPhone[0]==0){
    	Toast.info('请输入正确的手机号');
      return;
    }
   if (!fieldsValue.zipCode || fieldsValue.zipCode == '') {
      Toast.info('邮政编码不能为空');
      return;
    }/* else if(String(fieldsValue.zipCode).length!=6||String(fieldsValue.zipCode)[0]==0){
    	Toast.info('请输入正确的邮政编码');
    	return;
    }*/
    if (!fieldsValue.areaIds || fieldsValue.areaIds.length == 0) {
      Toast.info('请选择所在地区');
      return;
    }
    if (!fieldsValue.address || fieldsValue.address == '') {
      Toast.info('详细地址不能为空');
      return;
    }
/*    if(fieldsValue.telPhone) {
        if (9 < fieldsValue.telPhone.length || fieldsValue.telPhone.length < 7) {
            Toast.info('请输入正确的座机号码');
            return;
        }
        if (fieldsValue.telPhone.length != 7) {
            Toast.info('座机电话格式不正确');
            return;
        }
    }*/
      Toast.loading();

    const provinceId = fieldsValue.areaIds[0];
    const cityId = fieldsValue.areaIds[1];
    const areaId = fieldsValue.areaIds[2];

    const currentProvince = (district.filter(item => item.value == provinceId))[0]
    const currentCity = (currentProvince.children.filter(item => item.value == cityId))[0]
    const currentArea = (currentCity.children.filter(item => item.value == areaId))[0]
    const currentAreaName = [currentProvince.label, currentCity.label, currentArea.label].join(',');

    console.log(fieldsValue);
    addressApi.saveAddress({
      addressId: this.props.location.state.addressId,
      ...fieldsValue,
      provinceId,
      cityId,
      areaId,
      areaInfo: currentAreaName
    }).then(result => {
        Toast.hide();

        if (result.result == 1) {
        this.props.router.push('/address')
      } else {
        Toast.info(result.msg);
      }
    })

  }

	onBlur=()=>{
		this.setState({
      sty:false
    })
	}
	onFocus=()=>{
		this.setState({
      sty:true
    })
	}
	onBlur1=()=>{
		this.setState({
      sty1:false
    })
	}
	onFocus1=()=>{
		this.setState({
      sty1:true
    })
	}
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    // const { getFieldProps } = this.props.form;
    return <div className='wx-order-address-add'>
      <List className="picker-list">
        <InputItem
            {...getFieldProps('trueName')}
            clear
            placeholder="请输入收货人"
        >收货人</InputItem>
        <InputItem
            {...getFieldProps('mobPhone')}
            clear
            type='phone'
            placeholder="请输入手机号"
        >手机号</InputItem>
          <InputItem
           {...getFieldProps('zipCode')}
           clear
           type='number'
           placeholder="请输入邮政编码">邮政编码</InputItem>
        <Item className="picker_list_adress_box">
        <Picker
            data={district}
            title="选择地区"
            {...getFieldProps('areaIds')}
        >
          <List.Item arrow="horizontal" className="picker_list_adress">所在地区</List.Item>
        </Picker>
        </Item>
        <InputItem
            {...getFieldProps('address')}
            clear
            onFocus={this.onFocus1}
            onBlur={this.onBlur1}
            placeholder="详细地址">详细地址</InputItem>
           <InputItem
           {...getFieldProps('telPhone')}
           clear
           onFocus={this.onFocus}
           onBlur={this.onBlur}
           type='number'
           placeholder="座机电话">座机电话</InputItem>
        <Item style={{width:'100%',background:'none',padding:'35vh 0px 2vh'}}>
          <Button onClick={this.onSubmit} inline type='primary'style={{height:'0.7rem',borderRadius:'3px',margin:'0px 0.26rem',lineHeight:'0.65rem',backgroundColor:'#00a9e0',borderColor:'#00a9e0',width:'100%'}}>保存</Button>
          {/*<Button type='primary' inline style={{height:'0.7rem',borderRadius:'3px',margin:'0px 0.26rem',lineHeight:'0.65rem',backgroundColor:'#fff',borderColor:'#e5e5e5',color:'#808080',width:'43%'}}>删除</Button>*/}
        </Item>
      </List>
    </div>
    /*<div className='wx-address-add'>
      <List className="picker-list">
         <InputItem
            {...getFieldProps('trueName')}
            clear
            placeholder="请输入收货人"
          >收货人</InputItem>
        <InputItem
            {...getFieldProps('mobPhone')}
            clear
            type='phone'
            placeholder="请输入手机号"
        >手机号</InputItem>
        <InputItem
            {...getFieldProps('zipCode')}
            clear
            type='number'
            placeholder="请输入邮政编码">邮政编码</InputItem>
        <Picker   
          data={district}
          title="选择地区"
          {...getFieldProps('areaIds')}
        >
          <List.Item arrow="horizontal">所在地区</List.Item>
        </Picker>
        <InputItem style={this.state.sty1==true?{position:'absolute',top:'10%',borderRadius:'30px',zIndex:'99999',width:'91%',padding:'0.2rem 0.3rem',border:'1px solid #000',borderBottom:'2px solid #000',background:'rgb(235, 235, 239)'}:{}}
            {...getFieldProps('address')}
            clear
            placeholder="详细地址">详细地址</InputItem>
        <InputItem style={this.state.sty==true?{position:'absolute',top:'15%',borderRadius:'30px',zIndex:'99999',width:'91%',padding:'0.2rem 0.3rem',border:'1px solid #000',borderBottom:'2px solid #000',background:'rgb(235, 235, 239)'}:{}}
            {...getFieldProps('telPhone')}
            clear
            type='number'
            placeholder="座机电话">座机电话</InputItem>
        <Item>
          <Button onClick={this.onSubmit} type='primary'>保存</Button>
        </Item>
      </List>
    </div>*/
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(
  connect(mapStateToProps)(
    createForm()(AddressEdit)
  )
);