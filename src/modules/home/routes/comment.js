import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  TextareaItem,
  ImagePicker,
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import CommentImg from '../components/CommentImg';
import { common } from 'common';
import * as orderApi from '../api/order';
import './comment.less';

const AgreeItem = Checkbox.AgreeItem;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      gevalIsAnonymous: 0,
      gevalScore: 0,
      gevalContent: '',
      sevalDeliverycredit: 0,
      sevalDesccredit: 0,
      recId: '',
      imgUrl: '',
      sevalServicecredit: 0,
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  postComment = () => {
    const { goods, orderSn } = this.props.location.state;
    const files = this.state.files;
    if (this.state.gevalContent == '') {
      Toast.info('请填写评论', 1)
      return;
    }
      Toast.loading();
      if (files.length == 0) {
      orderApi.saveReviews({
        ...this.state,
        orderSn,
        recId: goods.recId,
      }).then(r => {
          Toast.hide();
          if (r.result == 1) {
          Toast.info(r.msg);
          this.props.router.push('/orderList/3')
        } else {
          Toast.info(r.msg);
        }
      })
      return;
    }

    orderApi.filesUpload({
      images: files.map(item => item.file)
    }).then(result => {
        // 上传图片成功
      if (result.result == 1) {
        const imgUrl = result.data;
        orderApi.saveReviews({
          ...this.state,
          imgUrl,
          orderSn,
          recId: goods.recId,
        }).then(r => {
            Toast.hide();
          if (r.result == 1) {
            Toast.info(r.msg);
            this.props.router.push('/orderList/3')
          } else {
            Toast.info(r.msg);
          }
        })
      }else {
          Toast.info(r.msg);
      }
    })
  }

  // 修改评分
  onChangeScore = (key, score) => {
    this.setState({
      [key]: score
    })
  }

  onChangeComment = (value) => {
    this.setState({
      gevalContent: value
    })
  }

  render() {
    const { goods } = this.props.location.state;
    const {
      files,
      gevalIsAnonymous,
      gevalContent
    } = this.state;
    return (
      <div className="wx-comment fix-scroll">
        <div style={{backgroundColor:'white'}}>
          <Flex style={{marginTop:'0.9rem',padding:'0.2rem 0.26rem'}} align="top">
            <Img src={goods.goodsImage} style={{width:'1.4rem',height:'1.4rem'}} />
            <Flex.Item>
              <TextareaItem
                  onChange={(value)=>this.onChangeComment(value)}
                  placeholder="请输入评价内容"
                  rows={4}
                  value={this.state.gevalContent}
                  className="textAreaTtem"
                  count={255}
              />
                {/*<p style={{marginRight:'0.2rem'}}>{goods.goodsName}</p>
                 <p style={{color:'red'}}>{`￥${goods.goodsPrice}`}</p>*/}
            </Flex.Item>
          </Flex>
            {/*上传图片*/}
          <div style={{padding:'0rem 0.26rem 0.2rem'}}>
            <ImagePicker
                files={files}
                onChange={this.onChange}
                selectable={files.length < 3}
                className="imagesPicker"
            />
          </div>
        </div>
        <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>

        <div style={{background:'#fff'}}>
          <Flex justify="between" className="comment_score">
            <div className="comment_score_name">整体评价:</div>
            <div className="commstar-mod">
              <CommentImg onChangeScore={score => {
                this.onChangeScore('gevalScore',score)
              }} />
            </div>
          </Flex>
          <Flex justify="between" className="comment_score">
            <div className="comment_score_name">发货速度:</div>
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalDeliverycredit',score)
              }} />
            </div>
          </Flex>
          <Flex justify="between" className="comment_score">
            <div className="comment_score_name">服务态度:</div>
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalServicecredit',score)
              }} />
            </div>
          </Flex>
          <Flex justify="between" className="comment_score" style={{borderBottom:'none'}}>
            <div className="comment_score_name">描述相符:</div>
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalDesccredit',score)
              }} />
            </div>
          </Flex>
          <div style={{height:'3rem',backgroundColor:'white'}}></div>
        </div>

        <div style={{position:'fixed',bottom:'0px',left:'0px',width:'100%',height:'0.9rem',background:'#fff'}}>
          <Flex justify='between' >
            <AgreeItem
                checked={gevalIsAnonymous==1}
                onChange={e => this.setState({
                    gevalIsAnonymous: e.target.checked ? 1:0
                })} className="agreeItem" >
              <div style={{paddingLeft:'0.2rem'}}>匿名评价</div>
            </AgreeItem>
            <div>
              <Button inline type='ghost' onClick={this.postComment} style={{fontSize:'0.28rem',background:'#5491d2',borderColor:'#5491d2',borderRadius:'0px',color:'#fff',height:'0.9rem',width:'2rem'}}>发表评论</Button>
            </div>
          </Flex>
        </div>
      </div>
    )
  }
}

export default withRouter(Comment);
