/*
* 基因报告查询
* */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

import { List, InputItem, Button, Toast, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as loginApi from '../../../login/api/login';
import * as genen from '../../api/gene'
import './gene.less';
// import Flex from "antd-mobile/lib/flex/Flex.web.d";

const Item = List.Item;

class Login extends Component {
    code = null

 /*   state = {
        countDown: 60,
        showCountDown: false,

    }*/
    constructor(props) {
        super(props);
        // 获取URL参数
        if (this.props.location.query) {
            if (this.props.location.query.callBack) {
                this.callBack = this.props.location.query.callBack;
            }
        }
        this.state = {
            countDown: 60,
            showCountDown: false,
            geneselectReport:[]
        }
    }
    //验证码计时
    countDown = () => {
        const self = this;
        this.timout = setTimeout(function() {
            if (self.state.countDown > 0) {
                self.setState({ countDown: self.state.countDown - 1 });
                self.countDown();
            } else {
                self.setState({
                    showCountDown: false
                });
            }
        }, 1000, 0);
    }
    // onbindBarCode = () => {
    //     this.props.router.push('/bindBarCode');
    // }
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
        if (!getFieldsValue.mobile || getFieldsValue.mobile.length != 11) {
            Toast.info('请正确输入手机号！');
            return;
        }
        loginApi.verifyCode({ mobile: getFieldsValue.mobile, }).then(result => {

            if (result.result == 0) {
                //debugger
                Toast.fail(result.msg);
                return;
            }
            //debugger
            //this.code = result.data.verifyCode
            this.setState({
                showCountDown: true,
                countDown: 60
            })
            this.countDown();
        });
    }
    onbindBarCode = () => {
        const getFieldsValue = this.props.form.getFieldsValue();
        console.log(getFieldsValue)
        if (!getFieldsValue.barCode || getFieldsValue.barCode == '') {
            Toast.info('请输入条形码！',1);
            return;
        }
        if (!getFieldsValue.mobile || getFieldsValue.mobile == '') {
            Toast.info('请先输入手机号！',1);
            return;
        }
        if (getFieldsValue.mobile.replace(/\s/g, '').length < 11) {
            Toast.info('请正确输入手机号！',1);
            return;
        }
        genen.getOrderState({
            barcode: getFieldsValue.barCode.replace(/\s/g, ''),//去除空格
            userName: getFieldsValue.mobile.replace(/\s/g, ''),//去除空格
        }).then(result => {
            // 注册处理
            const data = result.data;

            console.log(result.result)
            if (result.result == 1) {
                const orderlist = data.shopGeneOrderStatesList[0];
                // this.props.router.push('/queryResult')shopGeneOrderStatesList user_name
                if(orderlist){
                    if(orderlist.user_name==getFieldsValue.mobile){
                        this.props.router.push({
                            pathname: '/queryResult',
                            state: {
                                data
                            }
                        })
                    }else{
                        Toast.info('手机号输入错误',1);
                    }
                }else{
                    Toast.info('数据获取失败',1);
                }


            }else{
                Toast.info(result.msg,1);
            }
        });
    }
  /*  onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error, value) => {
            if (!error) {
                loginApi.login(this.props.form.getFieldsValue()).then(result => {
                    if (result.result == 1) {
                        Toast.success('登录成功');
                        // 登录成功保存 token
                        localStorage.setItem('token', result.data[0].token);
                        // localStorage.setItem(result.data[0].token, new Date());设置时间
                        window.location.href = this.callBack || '/mall/home.html';
                    } else {
                        Toast.fail(result.msg, 1);
                    }
                })
            }
        });
    }*/
 /*   validateusername = (rule, value, callback) => {
        if (value && value.length > 4) {
            callback();
        } else {
            callback(new Error('用户名至少4个字符'));
        }
    }*/
    render() {
        console.log(this.state.showCountDown);
        const { getFieldProps, getFieldError } = this.props.form;

        return (<form>
            <Flex className="imgbackrground" direction="column">
                <img src="./assets/img/weiqing/chaxun-02@2x.png" width="267px" height="202px"/>
                <p className="text_p">基因报告查询</p>
            </Flex>
            <List
                className="geneLoginlist"
                renderFooter={() => getFieldError('barCode') && getFieldError('barCode').join(',')}
            >
                <InputItem
                    {...getFieldProps('barCode', {
                        rules: [
                            { required: true, message: '请输入条形码' },
                            { validator: this.validateusername },
                        ],
                    })}
                    clear
                    type="number"
                    placeholder="条形码"
                >

                </InputItem>
                <InputItem {...getFieldProps('mobile')} placeholder="手机号" type="phone">
                </InputItem>


                <Item className="queryButton">
                    <Button type="primary" onClick={this.onbindBarCode} style={{
                        background:'#5491d2',
                        height:'0.7rem',
                        lineHeight:'0.7rem',
                        fongSize:'0.28rem',
                        borderRadius:'5px',
                        borderColor:'#5491d2'
                    }}>查询</Button>
                </Item>
                {/*<Item extra={<Link to='/forgetPassword' style={{color:'#777'}}>忘记密码?</Link>}><Link to='/reg' style={{color:'#777'}}>注册账号</Link></Item>*/}
            </List>
        </form>);
    }
}

export default createForm()(Login);
