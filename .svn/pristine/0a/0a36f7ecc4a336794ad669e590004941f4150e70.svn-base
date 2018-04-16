/**
 * Created by leimingtech-lhm on 2017/7/28.
 */
import React, {Component} from 'react'
import {common} from 'common';
import './layer.css';
class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.showState,
            showAction: false
        }
        setTimeout(() => {
            if (!this.state.showAction) {
                this.setState({
                    showAction: true
                })
            }
        }, 500)
    }


    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        if (this.state.show) {
            return null
        } else {
            return <div id="layui-m-layer1" className="layui-m-layer layui-m-layer2">
                <div className="layui-m-layershade" style={{background: 'none'}}></div>
                <div className="layui-m-layermain">
                    <div className="layui-m-layersection" style={{verticalAlign: 'middle !important'}}>
                        {this.state.showAction ? <div className="layui-m-layerchild  layui-m-anim-scale">
                            <div className="layui-m-layercont"><i></i><i
                                className="layui-m-layerload"></i><i></i>{/*<p>加载中</p>*/}
                            </div>
                        </div> : null}
                    </div>
                </div>
            </div>
        }
    }
}

export default Loading;