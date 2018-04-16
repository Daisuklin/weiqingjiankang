/*
 * 基因报告查询
 * */
import React, {Component} from 'react'
import {withRouter, Link} from 'react-router'

import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

import {List, InputItem, Button, Modal, Flex,Toast,Picker,DatePicker} from 'antd-mobile';
import {createForm} from 'rc-form';
import {common} from 'common';
//import * as loginApi from '../../../login/api/login';
import  * as genen from '../../api/gene';
import './gene.less';
// import Flex from "antd-mobile/lib/flex/Flex.web.d";

const Item = List.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal3: false,
        };
        // 获取URL参数
        if (this.props.location.query) {
            if (this.props.location.query.callBack) {
                this.callBack = this.props.location.query.callBack;
            }
        }
    }

    onqueryResult = () => {
        const getFieldsValue = this.props.form.getFieldsValue();
        if (!getFieldsValue.receiverName || getFieldsValue.receiverName == '') {
            Toast.info('请输入姓名！');
            return;
        }
        if (!getFieldsValue.sex || getFieldsValue.sex == '') {
            Toast.info('请输入性别！');

            return;
        }
        if (!getFieldsValue.mobileNumber || getFieldsValue.mobileNumber == '') {
            Toast.info('请输入手机号！');
            return;
        }
        if (!getFieldsValue.birthday || getFieldsValue.birthday == '') {
            Toast.info('请输入出生日期！');
            return;
        }
        if (!getFieldsValue.nation || getFieldsValue.nation == '') {
            Toast.info('请输入民族！');
            return;
        }
        if (!getFieldsValue.height || getFieldsValue.nation == '') {
            Toast.info('请输入身高！');
            return;
        }
        if (!getFieldsValue.weight || getFieldsValue.weight == '') {
            Toast.info('请输入体重！');
            return;
        }
        console.log(getFieldsValue.sex );
        console.log(getFieldsValue.birthday );
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (!getFieldsValue.email || getFieldsValue.email != '') {
            if(!reg.test(getFieldsValue.email)){
                Toast.info('请输入正确的邮箱！');
                return;
                }
        }
        // if (!getFieldsValue.nationality || getFieldsValue.nationality == '') {
        //     Toast.info('请输入国籍！');
        //     return;
        // }
        // if (!getFieldsValue.placeOfOrigin || getFieldsValue.placeOfOrigin == '') {
        //     Toast.info('请输入籍贯！');
        //     return;
        // }
        // if (!getFieldsValue.diseaseHistory || getFieldsValue.diseaseHistory == '') {
        //     Toast.info('请输入受检者家族病史！');
        //     return;
        // }
        // genen.bindBarCode({
        //     barCode:getFieldsValue.barCode
        // })
        genen.geneReport({
            receiverName: getFieldsValue.receiverName,
            sex: getFieldsValue.sex[0],
            mobileNumber: getFieldsValue.mobileNumber,
            birthday:moment(getFieldsValue.birthday).format('YYYY-MM-DD'),
            nation: getFieldsValue.nation,
            height: getFieldsValue.height,
            weight: getFieldsValue.weight,
            email: getFieldsValue.email,
            nationality: getFieldsValue.nationality,
            placeOfOrigin: getFieldsValue.placeOfOrigin,
            diseaseHistory: getFieldsValue.diseaseHistory,
            barCode:this.props.params.barCode
            // barCode:getFieldsValue.barCode;
        }).then(result => {
            //
            // 注册处理
            if (result.result == 1) {
                Toast.info(result.msg);
                this.props.router.push('/geneQuery');
                // return;

            }else {
                // this.props.router.push('/geneQuery');
                Toast.fail(result.msg);
                //
            }
            // // 注册成功提示
            // Toast.success(result.msg);
            // // 跳转到登录
            // common.gotoLogin();
        });
        // this.props.router.push('/queryResult');

    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        const myDate = new Date()
        let y=myDate.getFullYear();
        let m=myDate.getMonth()+1;
        let d= myDate.getDate();
       // label: '2013',
          //  value: '2013',
        let district=[{label:'男',value:'male'},{label:'女',value:'female'}];
        const maxDate = moment().utcOffset(8);
        const minDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
        return (<form>
            {/*<Flex className="imgbackrground" direction="column">
             <img src="./assets/img/weiqing/chaxun-02@2x.png" width="267px" height="202px"/>
             <p className="text_p">基因报告查询</p>
             </Flex>*/}
            <List
                className="personalinfomationlist"
                renderFooter={() => getFieldError('username') && getFieldError('username').join(',')}
            >
                <div style={{paddingBottom:'1rem'}}>
                    <InputItem
                        {...getFieldProps('receiverName', {
                            rules: [
                                {required: true, message: '请输入姓名'},
                                {validator: this.validateusername},
                            ],
                        })}
                        clear
                        extra={<span style={{color: '#e60012'}}>*</span>}
                        placeholder="姓名"
                    >
                    </InputItem>
                   <List.Item className="am-list-item am-input-item">
                    <Picker
                        //onOk={(v)=>{this.setState({})}}
                        data={district} cols={1} {...getFieldProps('sex',
                        {
                            rules: [
                                {required: true, message: '性别'},
                                {validator: this.validateusername},
                            ],
                        })} className="">
                        <List.Item arrow="horizontal" style={{color:'#ddd'}}><span style={{color:'#999999'}}>性别</span></List.Item>
                    </Picker>
                   </List.Item>


                    <InputItem {...getFieldProps('mobileNumber')} placeholder="手机号" type="phone" extra={<span style={{color: '#e60012'}}>*</span>}>
                    </InputItem>
                    <List.Item className="am-list-item am-input-item">
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            {...getFieldProps('birthday', {
                                rules: [
                                    {required: true, message: '请输入出生日期'},
                                    {validator: this.validateusername},
                                ],
                            })}
                            maxDate={maxDate}
                            minDate={minDate}>

                            <List.Item arrow="horizontal"><span style={{color:'#999'}}>出生日期</span></List.Item>
                        </DatePicker>
                    </List.Item>


                    <InputItem
                        {...getFieldProps('nation', {
                            rules: [
                                {required: true, message: '请输入民族'},
                                {validator: this.validateusername},
                            ],
                        })}
                        clear
                        extra={<span style={{color: '#e60012'}}>*</span>}
                        placeholder="民族"
                    >
                    </InputItem>
                    <InputItem
                        {...getFieldProps('height', {
                            rules: [
                                {required: true, message: '身高'},
                                {validator: this.validateusername},
                            ],
                        })}
                        clear
                        extra={<span style={{color: '#e60012'}}>*</span>}
                        placeholder="身高"
                    >
                    </InputItem>
                    <InputItem
                        {...getFieldProps('weight', {
                            rules: [
                                {required: true, message: '请输入体重'},
                                {validator: this.validateusername},
                            ],
                        })}
                        clear
                        extra={<span style={{color: '#e60012'}}>*</span>}
                        placeholder="体重"
                    >
                    </InputItem>
                    <InputItem
                        {...getFieldProps('email')}
                        clear
                        //extra={<span style={{color: '#e60012'}}>*</span>}
                        placeholder="邮箱"
                    >
                    </InputItem>
                    <InputItem
                        {...getFieldProps('nationality')}
                        clear
                        //extra={<span style={{color: '#e60012'}}>*</span>}
                        placeholder="国籍"
                    >
                    </InputItem>
                    <InputItem
                        {...getFieldProps('placeOfOrigin')}
                        clear
                        placeholder="籍贯"
                    >
                    </InputItem>
                    <InputItem
                        {...getFieldProps('diseaseHistory')}
                        clear
                       // extra={<span style={{color: '#e60012'}}>*</span>}
                        placeholder="受检者家族病史"
                    >
                    </InputItem>
                    <div className="text_product">
                        数据手机仅用于您的基因检测相关数据分析，卫青承诺不会向任何个人或组织提供您的信息，并在完成基因检测分析后删除您的个人信息。为了您的基因检测的准确性请尽可能完整的填写相关信息。
                    </div>


                </div>

                <Item className="queryButton">
                    <Button type="primary" onClick={
                        this.onqueryResult} style={{
                        background: '#5491d2',
                        height: '0.7rem',
                        lineHeight: '0.7rem',
                        fongSize: '0.28rem',
                        borderRadius: '5px',borderColor:'#5491d2'
                    }}>提交</Button>
                </Item>
                <Modal
                    title={<span style={{color:'#333',fontSize:'0.28rem'}}>提交成功</span>}
                    transparent
                    maskClosable={false}
                    visible={this.state.modal3}
                    onClose={this.onClose('modal3')}
                    footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal3')(); } }]}
                    platform="ios"
                >
                    <div style={{fontSise:'0.26rem',color:'#666',paddingBottom:'0.3rem'}}>个人信息已完善成功</div>
                </Modal>
                {/*<Item extra={<Link to='/forgetPassword' style={{color:'#777'}}>忘记密码?</Link>}><Link to='/reg' style={{color:'#777'}}>注册账号</Link></Item>*/}
            </List>
        </form>);
    }
}

export default createForm()(Login);
