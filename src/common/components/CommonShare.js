import React, { Component } from 'react'
import { common } from 'common';
import { Popup, Flex, List, WhiteSpace, Button, Badge } from 'antd-mobile';

import "./CommonShare.less"

class CommonShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shareParese: false,
            sel: '',
            txtTYpe:1
        }
    }

    componentDidMount() {
        this.setState({
            txtTYpe:this.props.txtTYpe
        })
    }
    //打开蒙版
    showShares = () => {
        this.setState({
            shareParese: true
        })
    }
    // 关闭蒙版
    closeMarkbox = () => {
        //this.onClose('cancel');
        Popup.hide();
        this.setState({
            shareParese:  false
        })
    }
    /*关闭*/
    onClose = (sel) => {
        this.setState({ sel });
        Popup.hide();
        if(this.props.redirect){
            window.location.href=this.props.redirect;
        }
    };
    render() {
        const {shareParese,txtTYpe}=this.state;
        // const {txtTYpe}=this.props;
        return (
            <div className='wx-CommonShare'>
                <div className="commonShare_content">
                    <div className="commonShare_content_title">{txtTYpe==1 ? <span>分享给好友</span>:<span>{this.props.title}</span>}</div>
                    <div className="commonShare_content_img" onClick={()=>{this.showShares()}}><img src="./assets/img/weiqing/fenxiang3.png" alt="icon"  style={{width:'6.4rem',height:'2.1rem'}}/></div>
                    <div className="commonShare_content_btn"><Button type="primary" onClick={() => this.onClose('cancel')}
                    style={{background:'#5491d2',borderColor:'#5491d2',fontSize:'0.28rem'}}
                    >取消</Button></div>
                </div>
                {
                    shareParese && <div className="share_content" style={{background:'url(./assets/img/weiqing/bj2_02.png) repeat'}}
                                        onClick={()=>{this.closeMarkbox()}}>
                        <div className="content_img1">
                            <img src="assets/img/weiqing/fenxiang2.png" style={{width:'1.64rem',height:'1.66rem'}} />
                        </div>
                        <div className="content_img2">
                            <img src="assets/img/weiqing/fenxiang1.png" style={{width:'3.34rem',height:'1.94rem'}} />
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default CommonShare;
