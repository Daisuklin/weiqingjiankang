/*
* 基因报告查询
* */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

import { List, InputItem, Button, Toast, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as loginApi from '../../../login/api/login';

import './gene.less';
// import Flex from "antd-mobile/lib/flex/Flex.web.d";

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
    onpersonalInformation = () => {
        this.props.router.push('/personalInformation');
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        return (<form>
            <Flex className="imgbackrground3" direction="column">
                <img src="./assets/img/weiqing/bdsj@2x.png" width="270px" height="271px" style={{paddingBottom:'0.42rem'}}/>
                <p className="text_p">绑定手机号</p>
            </Flex>
            <List
                className="geneLoginlist3"
                renderFooter={() => getFieldError('username') && getFieldError('username').join(',')}
            >

                <InputItem {...getFieldProps('phone')} placeholder="手机号" type="phone">
                </InputItem>
                <InputItem
                    {...getFieldProps('verificationcode', {
                        rules: [
                            { required: true, message: '请输入用户名' },
                            { validator: this.verificationcode },
                        ],
                    })}
                    clear
                    className="nameButtom"
                    placeholder="验证码"
                    extra={<div><Button type="primary"  style={{
                        background:'#5491d2',
                        height:'0.6rem',
                        lineHeight:'0.6rem',
                        fongSize:'0.28rem',
                        borderRadius:'5px',width:'170px',
                        borderColor:'#5491d2'
                    }}>获取验证码</Button></div>}
                >
                </InputItem>

                <Item className="queryButton">
                    <Button type="primary" onClick={this.onpersonalInformation} style={{
                        background:'#5491d2',
                        height:'0.7rem',
                        lineHeight:'0.7rem',
                        fongSize:'0.28rem',
                        borderRadius:'5px',
                        borderColor:'#5491d2'
                    }}>确定</Button>
                </Item>
                {/*<Item extra={<Link to='/forgetPassword' style={{color:'#777'}}>忘记密码?</Link>}><Link to='/reg' style={{color:'#777'}}>注册账号</Link></Item>*/}
            </List>
        </form>);
    }
}

export default createForm()(Login);
