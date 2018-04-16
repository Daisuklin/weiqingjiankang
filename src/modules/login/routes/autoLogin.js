/**
 * Created by leimingtech-lhm on 2017/7/2.
 */
import React, {Component} from 'react'
import { withRouter } from 'react-router'
import {Toast} from 'antd-mobile';
import {common} from 'common'
class autoLogin extends Component {
    constructor(props) {
        super(props);
        const url = location.href;
        //let backUrl = url.substring(url.indexOf("?") + 1, url.length)
        localStorage.setItem('token',this.props.params.token);
        let backUrl= localStorage.getItem('history');
       // Toast.info(backUrl)
        window.location.href=backUrl;
    }

    render() {
        Toast.loading();
    }
}

export default withRouter(autoLogin);