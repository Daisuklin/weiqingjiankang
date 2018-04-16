import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button,
  InputItem,
  List,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as memberApi from '../../api/member';
import './updataCommon.less'

class UpdatePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  update = () => {
    const getFieldsValue = this.props.form.getFieldsValue();
    if (!getFieldsValue.password || getFieldsValue.password == '') {
      Toast.info('请输入密码！');
      return;
    }
    if (!getFieldsValue.newpassword || getFieldsValue.newpassword == '') {
      Toast.info('请输入新密码！');
      return;
    }
    if (!getFieldsValue.newpassword1 || getFieldsValue.newpassword1 == '') {
      Toast.info('请确认新密码！');
      return;
    }

    if (getFieldsValue.newpassword != getFieldsValue.newpassword1) {
      Toast.info('两次输入的密码不一致！');
      return;
    }

    memberApi.updatePassword({
      newpassword: getFieldsValue.newpassword,
      password: getFieldsValue.password
    }).then(result => {
      // 修改密码处理
      if (result.result == 0) {
        Toast.fail(result.msg);
        return;
      }

      // 修改成功提示
      Toast.success(result.msg);
      // 跳转到登录
      common.gotoLogin();
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <List style={{backgroundColor:'#fff',paddingBottom:'0.3rem'}} className="updatePassword">
        <InputItem
          {...getFieldProps('password')}  
            clear
            placeholder="请输入原密码"
            autoFocus
          type='password'
        ></InputItem>
        <InputItem
           {...getFieldProps('newpassword')}  
            clear
            placeholder="请输入新密码"
            type='password'
        ></InputItem>
        <InputItem
            {...getFieldProps('newpassword1')}  
            clear
             type='password'
            placeholder="请输入确认密码"
        ></InputItem>
        <div style={{paddingTop:'0.3rem'}}>
          <Button onClick={this.update} type='primary'style={{height:'0.7rem',borderRadius:'3px',margin:'0px 0.26rem',lineHeight:'0.65rem',backgroundColor:'#00a9e0',borderColor:'#00a9e0'}}>确定</Button>
        </div>

      </List>
    );
  }
}

export default withRouter(createForm()(UpdatePassword));
