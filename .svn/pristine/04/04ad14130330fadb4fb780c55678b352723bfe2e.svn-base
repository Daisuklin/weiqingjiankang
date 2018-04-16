import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  List,
  Button,
  Steps
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as geneApi from '../../api/gene'
const Step = Steps.Step;
const Item = List.Item;
import './gene.less';

class ProgressDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
        getOrderState:[],
        selectReport:[],
        geneReportDownloadr:[],
        isInit:false
    }
  }

/*  componentDidMount() {
      const  getOrderState  =  this.props.location.state;
      const  queryResult  =  getOrderState.data;
      /!*查询报告接口*!/
      geneApi.geneselectReport({
          barcode:queryResult[0].barcode,
          userName:queryResult[0].user_name
      }).then(result => {
          if (result.result == 1) {
              const data = result.data;
              // console.log(data)
              this.setState({
                  selectReport:data,
                  isInit:true
              });
          }
      })

  }*/
    gotoGeneOrderList = () => {
        this.props.router.push(`/orderList/0`);
    }
    /*查看*/
    lookForQuery = () => {
        const  getOrderState  =  this.props.location.state;
        const  queryResultbox  =  getOrderState.data;
        const queryResult = queryResultbox.shopGeneOrderStatesList;
        console.log(queryResult)
        /*下载地址接口*/
        window.open(common.SERVER_DOMAIN + '/gene/geneOnlineView?order_id='+ queryResult[0].order_id);
     /*   geneApi.geneReportDownloadr({
            order_id:queryResult[0].order_id
        }).then(result => {
            if (result.result == 1) {
                const data = result.data;
                console.log(data)

                // this.props.router.push(`/viewResults/${queryResult[0].order_id}`);
            }
        })*/
    }
    /*下载*/
    lookDownload = () => {
        const  getOrderState  =  this.props.location.state;
        const  queryResultbox  =  getOrderState.data;
        const queryResult = queryResultbox.shopGeneOrderStatesList;
        /*下载地址接口*/
        geneApi.geneReportDownloadr({
            order_id:queryResult[0].order_id
        }).then(result => {
            if (result.result == 1) {
                const data = result.data;
                console.log(data)
                window.open(common.IMAGE_DOMAIN + data.pdfPath)
            }
        })
    }

  render() {
    const  getOrderState  =  this.props.location.state;
      const  queryResultbox  =  getOrderState.data;
      const queryResult = queryResultbox.shopGeneOrderStatesList;
      // const {selectReport} = this.state;
    /*  if(!this.state.isInit){
         return null;
      }*/
      console.log(queryResultbox)
    return (
      <div className="wx-queryResult-detail fix-scroll">
        <List>
            {
                (queryResult[0].task=='Send Reports' && queryResult[0].state=='Completed') ? <Item className="queryResult_top">报告已生成</Item>:<Item className="queryResult_top">报告未生成</Item>
            }
          <Item style={{}} className="queryResult_center">
            <div style={{padding:'0.12rem 0.45rem 0.52rem',overflow:'hidden'}}>
              <div className="product_img"><img src="./assets/img/weiqing/chaxun-01@2x.png" style={{width:'155px',height:'147px'}}/></div>
                {
                    (queryResult[0].task=='Send Reports' && queryResult[0].state=='Completed') ?  <div className="product_btn" >
                        <Button type="primary" onClick={()=>this.lookForQuery()} size="small" inline style={{backgroundColor:'#5491d2',borderColor:'#5491d2',height:'0.6rem',lineHeight:'0.6rem',fongSize:'0.24rem'}}>查看</Button>
                            {
                                queryResultbox.canDownload == 1 && <Button type="primary" size="small"onClick={()=>this.lookDownload()}  inline style={{backgroundColor:'#fff',borderColor:'#5491d2',height:'0.6rem',lineHeight:'0.6rem',fongSize:'0.24rem',color:'#5491d2',marginLeft:'0.2rem'}}>下载</Button>
                            }
                    </div>:''
                }
            </div>
          </Item>
          <Item>
              {/*验证订单有效性*/}
              {
                  queryResult[0].task_id == 11 && <Steps size="small" current={0} className="stepsBox">
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>订单已生成</span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}>{queryResult.task_started_at}</span>} />
                  </Steps>
              }
              {/*寄送采集器*/}
              {
                  queryResult[0].task_id == 12 &&<Steps size="small" current={1} className="stepsBox">
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>订单已生成</span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}>{queryResult.task_started_at}</span>} />

                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>
                          寄送采集器
                      {queryResult[0].task=='Queued' && <span>等待中</span>}
                          {queryResult[0].task=='In Progress' && <span>进行中</span>}
                          {queryResult[0].task=='Completed' && <span>已完成</span>}
                          {queryResult[0].task=='Aborted' && <span>已失败</span>}
                          {queryResult[0].task=='Canceled' && <span>已取消</span>}
                          {queryResult[0].task=='Disregarded' && <span>已放弃</span>}
                      </span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}>2017-5-06 08：36</span>}  />
                  </Steps>
              }
              {/*用户回寄采集器*/}
              {
                  queryResult[0].task_id == 13 &&<Steps size="small" current={2} className="stepsBox">
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>订单已生成</span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}></span>} />
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>寄送采集器已完成</span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}></span>} />
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>
                          用户回寄采集器
                          {queryResult[0].task=='Queued' && <span>等待中</span>}
                          {queryResult[0].task=='In Progress' && <span>进行中</span>}
                          {queryResult[0].task=='Completed' && <span>已完成</span>}
                          {queryResult[0].task=='Aborted' && <span>已失败</span>}
                          {queryResult[0].task=='Canceled' && <span>已取消</span>}
                          {queryResult[0].task=='Disregarded' && <span>已放弃</span>}
                      </span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}>{queryResult.task_started_at}</span>}  />
                  </Steps>
              }
              {/*发送报告*/}
              {
                  queryResult[0].task_id == 14 &&<Steps size="small" current={3} className="stepsBox">
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>订单已生成</span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}></span>} />
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>寄送采集器已完成</span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}></span>} />
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>用户回寄采集器</span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}></span>} />
                      <Step title={<span style={{fontSize:'0.26rem',color:'#333'}}>
                          发送报告
                          {queryResult[0].task=='Queued' && <span>等待中</span>}
                          {queryResult[0].task=='In Progress' && <span>进行中</span>}
                          {queryResult[0].task=='Completed' && <span>已完成</span>}
                          {queryResult[0].task=='Aborted' && <span>已失败</span>}
                          {queryResult[0].task=='Canceled' && <span>已取消</span>}
                          {queryResult[0].task=='Disregarded' && <span>已放弃</span>}
                          {queryResult[0].task=='Send Reports' && queryResult[0].state=='Completed' && <span>成功，报告可下载</span>}
                      </span>} description={<span style={{fontSize:'0.26rem',color:'#999'}}>{queryResult[0].task_started_at}</span>}  />
                  </Steps>
              }
          </Item>
        </List> 
      </div>
    )
  }
}

export default withRouter(ProgressDetail);
