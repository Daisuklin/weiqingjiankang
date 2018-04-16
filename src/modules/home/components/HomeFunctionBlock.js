import React, {Component} from 'react';
import {Grid, Flex, WingBlank, WhiteSpace} from 'antd-mobile';
import {Img} from 'commonComponent';
import {withRouter} from 'react-router'
import './HomeFunctionBlock.less';
import {common} from 'common';

class HomeFunctionBlock extends React.PureComponent {
    onClick = (el, index) => {
        window.location.href = el.navUrl;
       // console.log(el)
    }

    renderItem = (dataItem) => {
        return <div>
            <div style={{textAlign:'center',marginLeft:'0',height:'0.8rem',marginTop:'0.05rem'}}>
                <img src={dataItem.icon} style={{ height:'0.8rem' }} />
            </div>
            <div style={{ textAlign: 'center', marginLeft: '0', fontSize: '0.22rem',height:'0.26rem',marginTop:'0.1rem' }}>
                <div style={{height:'0.26rem'}}>{dataItem.text}</div>
            </div>
        </div>
    }

    render() {
        const url =common.IMAGE_DOMAIN;
        let {data} = this.props;
        let object;
        let json = Array();
        for (let i=0;i<data.length;i++) {
            let navObj = new Map();
            let nav=data[i];
            navObj.set("icon", url + nav.navIcon);
            navObj.set("text", nav.navTitle);
            navObj.set("navUrl", nav.navUrl);
            object = common.strMapToObj(navObj);
            json.push(object)
        }
        return (
            <Grid data={json} columnNum={5} hasLine={false}
                  onClick={this.onClick}
                  renderItem={(dataItem) => (this.renderItem(dataItem))}/>
        )
    }
}

export default withRouter(HomeFunctionBlock);
