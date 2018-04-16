import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button
} from 'antd-mobile';
import * as storeApi from '../../api/store';

class CustomerService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: null,
        }
    }

  componentDidMount() {
      storeApi.storedetail({
          storeId: this.props.params.storeId
      }).then(result => {
          if (result.result == 1) {
              const data = result.data;
              this.setState({
                  store: data.store[0]
              })
          }
      });
  }

  render() {
      const { store } = this.state;
      if (!store) {
          return null;
      }
    return (
      <div style={{padding:'0.3rem 0.26rem'}}>
        <div style={{padding:'0 0.2rem',background:'#fff',borderRadius:'0.1rem'}}>
          <Flex style={{padding:'1.9rem 0 1.4rem',borderBottom:'1px dashed #efefef'}} direction="column">
            <div style={{}}><img src="./assets/img/weiqing/lxkf-01@2x.png" style={{width:'267px',height:'202px'}}/></div>
            <div style={{color:'#666',fontSize:'.28rem',padding:'0.4rem 0.26rem 0.2rem'}}>客服电话：{store.storeTel}</div>
          </Flex>
        </div>

      </div>
    );
  }
}

export default withRouter(CustomerService);
