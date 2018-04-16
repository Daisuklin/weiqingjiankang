import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  TextareaItem
} from 'antd-mobile';
import { common } from 'common';
import * as goodsDetailApi from '../api/goodsDetail';
import './consultList.less'

const Item = List.Item;

class ConsultEdit extends Component {

  state = {
    content: ''
  }

  static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func
  }

  componentWillUnmount() {
    this.context.clearAction();
  }

  submit = () => {
    if (this.state.content == '') {
      Toast.info('咨询内容不能为空', 1)
      return;
    }
    // const regex = new RegExp("/^[\u4E00-\u9FA5\w\d]+$/u"); 
    // const res = regex.test(this.state.content);
    // if (!res) {
    //   Toast.info('输入格式不合法', 1)
    //   return;
    // }
		if(this.state.content.length>200){
			Toast.info('请将咨询字数控制在200个以内');
		}else{
			 goodsDetailApi.saveConsult({
	      goodsId: this.props.params.goodsId,
	      consultContent: this.state.content
	    }).then(result => {
	      if (result.result == 1) {
	        Toast.info(result.msg, 1);
	        this.props.router.goBack();
	      } else {
	        Toast.info('购买咨询发布失败', 1);
	      }
	    })
		}  
  }

  componentDidMount() {
    // 绑定头部事件
    this.context.initAction({
      title: '提交',
      action: this.submit
    })
  }

  render() {
    return (
        <div style={{background:'#fff'}} className="wx-consultEdit">
      <List renderHeader='咨询内容'>
        <TextareaItem
          value={this.state.content}
          onChange={(value) => this.setState({
            content:value
          })}
          placeholder="请输入咨询内容"
          rows={5}
          autoFocus
          style={{margin:'0px 0.2rem',border:'1px solid #e5e5e5'}}
          />
      </List>
        </div>
    )
  }
}

export default withRouter(ConsultEdit);
