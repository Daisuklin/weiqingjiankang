/*
* 基因检测
* */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

import { List, InputItem, Button, Toast, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import  * as genen from '../../api/gene';
// import './gene.less';

const Item = List.Item;

class ViewGeneTesting extends Component {
    constructor(props) {
        super(props);
        this.state={
            isInit:false
        }
    }
/*    componentDidMount() {
        indexSearchApi.indexSearch({

        }).then(result => {
            if (result.result == 1) {
                const indexSearch = result.data;
                this.setState({
                    // ...result.data

                });
            }
        })
    }*/

    render() {
        return (
            <div className="wx-viewGeneTesting">
                <div className="viewGeneTest_imgBox">
                    <div className="img_iocn"><img src="./assets/img/pngX/gene-0.png" style={{width:'100%'}}/></div>
                    <div className="img_iocn"><img src="./assets/img/pngX/gene-1.png" style={{width:'100%'}}/></div>
                    <div className="img_iocn"><img src="./assets/img/pngX/gene-2.png" style={{width:'100%'}}/></div>
                    <div className="img_iocn"><img src="./assets/img/pngX/gene-3.png" style={{width:'100%'}}/></div>
                    <div className="img_iocn"><img src="./assets/img/pngX/gene-4.png" style={{width:'100%'}}/></div>
                    <div className="img_iocn"><img src="./assets/img/pngX/gene-5.png" style={{width:'100%'}}/></div>
                    <div className="img_iocn"><img src="./assets/img/pngX/gene-6.png" style={{width:'100%'}}/></div>
                    <div className="img_iocn"><img src="./assets/img/pngX/gene-7.png" style={{width:'100%'}}/></div>
                </div>
            </div>
        );
    }
}

export default createForm()(ViewGeneTesting);
