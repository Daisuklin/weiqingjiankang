import React, { Component } from 'react';
import { Flex, List, Grid } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import '../routes/goodsClass.less';
class GoodsList extends Component {

  onClick = (item) => {
    this.props.onGoodsClassClick(item);
  }

  render() {
    const { data } = this.props;
    const { advPosition, classCustomList } = data;

    if (!advPosition) {
      return null;
    }

    return <div style={{padding:'0rem 0.2rem'}}>

      {
        advPosition.advList[0] &&  <div>
          <Img src={advPosition.advList[0].resUrl} style={{width:'100%',height:'2.2rem'}}></Img>
        </div>
      }
      {
        classCustomList && classCustomList.map(customList => {
          const gridData = customList.classCustomList.map((item) => {
            return {
              icon: `${common.IMAGE_DOMAIN}${item.gcPic}`,
              text: item.gcName,
              ...item
            }
          });
          return <List key={customList.gcId} renderHeader={() => customList.gcName}>
            <Grid data={gridData}
              onClick={this.onClick}
              columnNum={3} hasLine={false} className="goodsList_grid" />
          </List> 
        })
      }
    </div>
  }
}

export default GoodsList;
