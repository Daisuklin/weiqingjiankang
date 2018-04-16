/*
 * 基因报告查询
 * */
import React, {Component} from 'react'
import {withRouter, Link} from 'react-router'

import {List, InputItem, Button, Toast, Flex} from 'antd-mobile';
import {createForm} from 'rc-form';
import {common} from 'common';
import * as loginApi from '../../../login/api/login';
import * as memberApi from '../../api/member';
import './gene.less';
// import Flex from "antd-mobile/lib/flex/Flex.web.d";

const Item = List.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countDown: 60,
            showCountDown: false,
            memberId: this.props.params.memberId
        }
        // 获取URL参数
        if (this.props.location.query) {
            if (this.props.location.query.callBack) {
                this.callBack = this.props.location.query.callBack;
            }
        }
    }

    // onbindBarCode = () => {
    //     this.props.router.push('/bindBarCode');
    // }
    countDown = () => {
        const self = this;
        setTimeout(function () {
            if (self.state.countDown > 0) {
                self.setState({countDown: self.state.countDown - 1});
                self.countDown();
            } else {
                self.setState({
                    showCountDown: false
                });
            }
        }, 1000, 0);
    }
    //获取验证码
    getCode = () => {
        if (this.state.showCountDown) {
            return;
        }
        const getFieldsValue = this.props.form.getFieldsValue();
        if (!getFieldsValue.mobile || getFieldsValue.mobile == '') {
            Toast.info('请先输入手机号！');
            return;
        }
        loginApi.verifyCode({mobile: getFieldsValue.mobile,}).then(result => {
            if (result.result == 0) {
                //debugger
                Toast.fail(result.msg);
                return;
            }
            //debugger
            this.setState({
                showCountDown: true,
                countDown: 60
            })
            this.countDown();
        });
    }
    onbindBarCode = () => {
        const getFieldsValue = this.props.form.getFieldsValue();
        memberApi.bindMobileList({
            memberId: this.state.memberId,
            mobileCode: getFieldsValue.code,
            mobile: getFieldsValue.mobile
        }).then(result => {
            if (result.result == 1) {
                // const url=location.href;
                // let backUrl=url.substring(url.indexOf("?")+1,url.length)
                localStorage.setItem('token', result.data);
                clearTimeout(this.timer);
                const backUrl = localStorage.getItem('history');
                Toast.success("绑定手机号成功", 2, window.location.href = backUrl);
            } else {
                Toast.fail(result.msg, 10);
            }
        });
    }
    validateusername = (rule, value, callback) => {
        if (value && value.length > 4) {
            callback();
        } else {
            callback(new Error('用户名至少4个字符'));
        }
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (<form>
            <Flex className="imgbackrground3" direction="column">
                <img src="./assets/img/weiqing/bdsj@2x.png" width="270px" height="271px" style={{paddingBottom:'0.42rem'}}/>
                <p className="text_p">绑定手机号</p>
            </Flex>
            <List
                className="geneLoginlist"
                renderFooter={() => getFieldError('barCode') && getFieldError('barCode').join(',')}
            >
                <InputItem {...getFieldProps('mobile')} placeholder="手机号" type="tel">
                </InputItem>
                <InputItem
                    {...getFieldProps('code', {
                        rules: [
                            {required: true, message: '请输入验证码'},
                            {validator: this.verificationcode},
                        ],
                    })}
                    onExtraClick={this.getCode}
                    clear
                    className="nameButtom"
                    placeholder="验证码"
                    extra={this.state.showCountDown ? `${this.state.countDown}秒后重新获取` : '获取验证码'}
                >
                </InputItem>

                <Item className="queryButton">
                    <Button type="primary" onClick={this.onbindBarCode} style={{
                        background: '#5491d2',
                        height: '0.7rem',
                        lineHeight: '0.7rem',
                        fongSize: '0.28rem',
                        borderRadius: '5px'
                    }}>绑定手机号</Button>
                </Item>
                {/*<Item extra={<Link to='/forgetPassword' style={{color:'#777'}}>忘记密码?</Link>}><Link to='/reg' style={{color:'#777'}}>注册账号</Link></Item>*/}
            </List>
        </form>);
    }
}

export default createForm()(Login);
