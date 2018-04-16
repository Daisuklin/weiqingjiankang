/*
* 绑定条形码
* */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

import { List, InputItem, Button, Toast, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
//import * as loginApi from '../../../login/api/login';
import  * as genen from '../../api/gene';

import './gene.less';

const Item = List.Item;

class bindBarCode extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:''
        }
        // 获取URL参数
        if (this.props.location.query) {
            if (this.props.location.query.callBack) {
                this.callBack = this.props.location.query.callBack;
            }
        }
    }

    onChange = (value) => {
        console.log(/^[A-Za-z0-9]+$/.test(value));
        console.log(value);
        if (/^[A-Za-z0-9]+$/.test(value)) {
           // console.log(/[a-zA-Z0-9]/.test(value));
            this.setState({
                value,
            });
        } else if(!/a-zA-Z0-9/g.test(value)&&value!=this.state.value&&value){
            this.setState({
                value:this.state.value,
            });
        }else {
            this.setState({
                value:'',
            });
        }

    }


    onbindBarCode = () => {
       // const getFieldsValue = this.props.form.getFieldsValue();
       // this.props.form.validateFields({ force: true }, (error, value) => {
        //    if (!error) {
                genen.bindBarCode({barCode:this.state.value}).then(result => {
                    if (result.result == 1) {
                        // ;
                        Toast.success('绑定成功');
                        this.props.router.push('/personalInformation/'+ this.state.value);
                        // 登录成功保存 token
                        // localStorage.setItem('token', result.data[0].token);
                        // localStorage.setItem(result.data[0].token, new Date());设置时间
                        //window.location.href = this.callBack || 'home.html';
                    } else {
                        Toast.fail(result.msg, 1);
                    }
                })
          //  }
      //  });


    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        return (<form>
            <Flex className="imgbackrground2" direction="column">
                <img src="./assets/img/weiqing/bdtxm@2x.png" width="270px" height="272px"/>
                <p className="text_p">绑定条形码</p>
            </Flex>
            <List
                className="geneLoginlist2"
                renderFooter={() => getFieldError('barCode') && getFieldError('barCode').join(',')}
            >
                <InputItem

                    onChange={this.onChange}
                    value={this.state.value}
                    clear
                    placeholder="请输入条形码"
                >
                </InputItem>
                <Item className="queryButton">
                    <Button type="primary" onClick={
                        // this.setState({
                        //     groupItemId: value.groupItemId,

                        // },this.onbindBarCode)
                         this.onbindBarCode
                    } style={{
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

export default createForm()(bindBarCode);
