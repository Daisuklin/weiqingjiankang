/*
* 基因检测
* */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

import { List, InputItem, Button, Toast, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import {Img} from 'commonComponent';
import { common } from 'common';
import  * as geneApi from '../../api/gene';
const Item = List.Item;

class ViewResilts extends Component {
    constructor(props) {
        super(props);
        this.state={
            isInit:false,
            ViewResilts:[],
            images:[]
        }
    }
    componentDidMount() {
        const order_id=this.props.params.order_id;
        console.log(order_id)
        geneApi.geneReportDownloadr({
            order_id:order_id
        }).then(result => {

            if (result.result == 1) {
                const data = result.data;
                const imgURL=data.images.split(",");
                console.log(imgURL)
                this.setState({
                    ViewResilts: data,
                    images:imgURL,
                    isInit:true
                });
            }
        })
    }

    render() {
        const {ViewResilts,images}= this.state;
        if(!this.state.isInit){
            return null;
        }
        return (
            <div className="wx-viewGeneTesting">
                <div className="viewGeneTest_imgBox">
                    {
                        images && images.map((imgURL,index)=>{
                            return <div className="img_iocn" key={index}>
                                <Img src={imgURL} style={{width:'100%'}}/>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default createForm()(ViewResilts);
