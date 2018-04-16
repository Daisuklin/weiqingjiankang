/**
 * 赠送好友组件
 * Created by leimingtech-lhm on 2017/5/15.
 */
import React, {Component} from 'react';
import { withRouter } from 'react-router'
import {Img} from 'commonComponent';
import {common} from 'common';
import '../routes/coupon.less'

/**图片在上面，文字在下面的布局 */
class GievFriends extends React.PureComponent {
    constructor(props) {
        super(props);
    }


    render() {
        // const PointsGoods=this.props.dataPoints;
        return <div className="give-coupon-block">
            <img src="./assets/img/weiqing/wdyhq-04@2x.png" style={{width:'0.40rem',height:'0.28rem',marginRight:'0.15rem'}}/>赠送好友
                </div>
    }
}
export default withRouter(GievFriends)