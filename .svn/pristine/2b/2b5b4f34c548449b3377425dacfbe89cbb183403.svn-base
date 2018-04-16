import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as loginApi from '../api/login';

import './login.less';

const Item = List.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    // 获取URL参数
    if (this.props.location.query) {
      if (this.props.location.query.callBack) {
        this.callBack = this.props.location.query.callBack;
      }
    }
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        loginApi.login(this.props.form.getFieldsValue()).then(result => {
          if (result.result == 1) {
            Toast.success('登录成功');
            // 登录成功保存 token
            localStorage.setItem('token', result.data[0].token);
              // localStorage.setItem(result.data[0].token, new Date());设置时间
            window.location.href = this.callBack || 'home.html';
          } else {
            Toast.fail(result.msg, 1);
          }
        })
      }
    });
  }
  /*validateusername = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('用户名至少4个字符'));
    }
  }*/
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<form>
      <List
        renderFooter={() => getFieldError('username') && getFieldError('username').join(',')}
      className="login_list"
      >
        <InputItem
          {...getFieldProps('username', {
            rules: [
              { required: true, message: '请输入用户名／邮箱／已验证邮箱' },
              { validator: this.validateusername },
            ],
          })}
          clear
          placeholder="请输入账号"
        ></InputItem>
        <InputItem {...getFieldProps('password')} placeholder="请输入密码" type="password">

        </InputItem>
        <Item style={{padding:'0.2rem 0.26rem 0px'}} className="item_button">
          <Button type="primary" onClick={this.onSubmit}  style={{background:'#00a9e0',borderColor:'#00a9e0',fontSize:'0.28rem',borderRadius:'3px',height:'0.7rem',lineHeight:'0.7rem'}}>登录</Button>
        </Item>
        <Item extra={<Link to='/forgetPassword' style={{color:'#777'}}>忘记密码?</Link>}><Link to='/reg' style={{color:'#777'}}>注册账号</Link></Item>
      </List>
    </form>);
  }
}

export default createForm()(Login);
