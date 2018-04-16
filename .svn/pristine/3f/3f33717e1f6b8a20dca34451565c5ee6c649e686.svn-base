import React, {Component} from 'react';
import {
    Flex,
    InputItem,
    Button,
    WingBlank,
    WhiteSpace,
    Toast
} from 'antd-mobile';
import {Img} from 'commonComponent';

import './GoodsSearchClass.less'

class GoodsSearchClassFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storeClassId: this.props.storeClassId,
            specList: []
        }
    }

    // 点击规格值
    onClickSpValue = (id) => {
        this.setState({
            storeClassId: id
        })
    }

    reset = () => {
        this.setState({
            storeClassId: ""
        })
        this.props.onClickSpValue("");
    }

    submit = () => {
        this.props.onClickSpValue(this.state.storeClassId);
    }

    componentWillMount() {
        const {specList} = this.props;
        const allSpecList = [];
        specList.map((spec, index) => {
            allSpecList.push(spec);
            if (spec.classList.length > 0) {
                spec.classList.map((value, i) => {
                    allSpecList.push(value)
                })
            }
        })
        this.setState({
            specList: allSpecList
        })
    }


    render() {
        return <div className='wx-GoodsSearchSpecFilter'>
            <div className='fix-scroll'>
                <WingBlank>
                    {
                        this.state.specList.map((spec, index) => {
                            return <div key={index} className='spec-value'>
                                <Flex wrap="wrap">
                                    <div className='spec-value' style={{paddingTop:'0.1rem'}}>
                                        <Button style={this.state.storeClassId == spec.stcId ? {
                                            height: '0.6rem',
                                            fontSize: '0.26rem',
                                            lineHeight: '0.6rem',
                                            color: '#fff',
                                            backgroundColor: '#5491d2',
                                            borderColor: '#f5f5f5',
                                            overflow: 'hidden'
                                        } : {
                                            height: '0.6rem',
                                            fontSize: '0.26rem',
                                            lineHeight: '0.6rem',
                                            color: '#333',
                                            backgroundColor: '#f5f5f5',
                                            borderColor: '#f5f5f5',
                                            overflow: 'hidden'
                                        }} onClick={() => this.onClickSpValue(spec.stcId)}>{spec.stcName}</Button>
                                    </div>
                                </Flex>
                            </div>
                        })
                    }
                </WingBlank>
            </div>
            <Flex className='spec-btn'>
                <Flex.Item style={{flex: 1}}>
                    <Button onClick={this.reset} style={{
                        height: '0.9rem',
                        lineHeight: '0.9rem',
                        width: '100%',
                        borderRadius: '0px',
                        borderBottom: 'none'
                    }}>重置</Button>
                </Flex.Item>
                <Flex.Item style={{flex: 1, marginLeft: '0px'}}>
                    <Button type='primary' onClick={this.submit} style={{
                        background: '#5491d2',
                        height: '0.9rem',
                        lineHeight: '0.9rem',
                        borderColor: '#5491d2',
                        width: '100%',
                        borderRadius: '0px'
                    }}>确定</Button>
                </Flex.Item>
            </Flex>
        </div>
    }
}

export default GoodsSearchClassFilter;
