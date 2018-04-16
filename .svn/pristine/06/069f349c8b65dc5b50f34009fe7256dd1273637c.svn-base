import React, { Component } from 'react'
import { TabBar, Icon } from 'antd-mobile';
import { common } from 'common';

import "./BottomBar.less"

const IconClass = ({ url }) => {
  return <div style={{
    width: '0.50rem',
    height: '0.50rem',
    background: `url(${url}) center center /  0.44rem 0.44rem no-repeat`
  }}
  />
}

class BottomBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.selectedTab || 'home'
    }
  }

  changeTab = (type) => {
    this.setState({
      selectedTab: type
    });
    if (type == 'home') {
      window.location.href = 'home.html';
    } else if (type == 'goodsClass') {
      window.location.href = 'goodsClass.html';
    } else if (type == 'cart') {
      window.location.href = 'cart.html';
    } else if (type == 'my') {
      window.location.href = 'home.html#/my';
    }
  }

  render() {
    return (
      <TabBar
      	tintColor='#5491d2'
        className="wx-tab-bar"   
        hidden={this.state.hidden}
      >
        <TabBar.Item       	
          title="首页"
          key="首页"
          icon={
            <IconClass url={'./assets/img/weiqing/dibu-07@2x.png'}></IconClass>
          }
          selectedIcon={
            <IconClass url={'./assets/img/weiqing/dibu-05@2x.png'}></IconClass>
          }
          selected={this.state.selectedTab === 'home'}
          onPress={()=>this.changeTab('home')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <IconClass url={'./assets/img/weiqing/dibu-02@2x.png'}></IconClass>
          }
          selectedIcon={
            <IconClass url={'./assets/img/weiqing/dibu-06@2x.png'}></IconClass>
          }
          selected={this.state.selectedTab === 'goodsClass'}
          title="分类"
          key="分类"
          onPress={()=>this.changeTab('goodsClass')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <IconClass url={'./assets/img/weiqing/dibu-03@2x.png'}></IconClass>
          }
          selectedIcon={
            <IconClass url={'./assets/img/weiqing/dibu-04@2x.png'}></IconClass>
          }
          selected={this.state.selectedTab === 'cart'}
          title="购物车"
          key="购物车"
          onPress={()=>this.changeTab('cart')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <IconClass url={'./assets/img/weiqing/dibu-01@2x.png'}></IconClass>
          }
          selectedIcon={
            <IconClass url={'./assets/img/weiqing/dibu-08@2x.png'}></IconClass>
          }
          selected={this.state.selectedTab === 'my'}
          title="我的"
          key="我的"
          onPress={()=>this.changeTab('my')}
        >
        </TabBar.Item>
      </TabBar>
    );
  }
}

export default BottomBar;
