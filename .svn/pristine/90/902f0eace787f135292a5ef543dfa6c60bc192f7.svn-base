import React, {ReactDOM, Component} from 'react'
import {withRouter} from 'react-router'
import {
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    List,
    Button,
    ActionSheet,
    Modal,
    DatePicker
} from 'antd-mobile';
import {createForm} from 'rc-form';
import {Img} from 'commonComponent';
import {common} from 'common';
import moment from 'moment';
import * as memberApi from '../../api/member';

import './account.less';

const Item = List.Item;
const sexs = {
    '1': '男',
    '2': '女',
    '3': '默认',
}

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberDetail: null
        }
    }

    getMember = () => {
        memberApi.memberDetail().then(result => {
            let data = result.data;
            if (data) {
                this.setState({
                    memberDetail: data[0]
                });
            }
        })
    }

    componentDidMount() {
        this.getMember();
    }

    gotoLogin = () => {
        common.gotoLogin();
    }

    logout = () => {
        Modal.alert('系统提示', '您确定要退出登录吗?', [
            {text: '取消'},
            {
                text: '确定',
                onPress: () => {
                    memberApi.logout({}).then(result => {
                        if (result.result == 1) {
                            common.removeToken('token');
                            window.location.href = common.SERVER_PATH+"/home.html";
                        } else {
                            Toast.fail(result.msg)
                        }
                    })
                }
            },
        ]);
    }

    gotoAddress = () => {
        this.props.router.push('/address')
    }

    changeIcon = () => {
        this.showActionSheet();
    }

    onChangeBirthday = (date) => {
        const dateStr = date.format('YYYY-MM-DD');
        memberApi.updateMemberInfo({
            birthday: dateStr
        }).then(r => {
            Toast.info(r.msg, 1)
            this.getMember();
        })
    }

    showSexSheet = () => {
        const BUTTONS = ['男', '女', '默认', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
            },
            (buttonIndex) => {
                if (buttonIndex == 3) {
                    return;
                }
                memberApi.updateMemberInfo({
                    sex: buttonIndex + 1
                }).then(result => {
                    Toast.info(result.msg, 1)
                    this.getMember();
                })
            });
    }

    showActionSheet = () => {
        const BUTTONS = ['上传头像', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    console.log(this.refs.head);
                    this.refs.head.click();
                }
            });
    }

    changeFile = (e) => {

        const files = this.refs.head.files[0];
        memberApi.filesUpload({
            images: files
        }).then(result => {
            if (result.result == 1) {
                const imgUrl = result.data;
                memberApi.updateMemberInfo({
                    imgUrl
                }).then(r => {
                    Toast.info(r.msg, 1)
                    this.getMember();
                })
            }
        });
    }

    render() {
        const {memberDetail} = this.state;
        if (!memberDetail) {
            return null;
        }

        const userIcon = <Img onClick={() => {
            this.props.router.push('/account')
        }}
                              style={{width: '1.1rem', height: '1.1rem', borderRadius: '50%'}}
                              src={memberDetail.memberAvatar}></Img>

        const memberBirthday = memberDetail.memberBirthdaystr && moment(memberDetail.memberBirthdaystr).utcOffset(8);
        const {getFieldProps} = this.props.form;

        const maxDate = moment().utcOffset(8);
        const minDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
        return <div className="wx-account">
            <List className="wx-account-list">
                <Item arrow="empty" extra={userIcon}  style={{padding: '0.1rem 0.26rem'}}
                      className="first_item">头像</Item>
                <WhiteSpace size="lg" style={{background: '#f3f3f3'}}/>
                <Item arrow="horizontal"
                      onClick={() => {
                          this.props.router.push({
                              pathname: '/updateNickName',
                              state: {
                                  nickname: memberDetail.memberTruename
                              }
                          })
                      }}
                      extra={memberDetail.memberTruename}><img src="./assets/img/weiqing/zhgl-06@2x.png" style={{
                    width: '0.32rem',
                    height: '0.32rem',
                    padding: '0px 0.2rem 3px 0px'
                }}/>昵称</Item>
                <Item extra={memberDetail.memberName} arrow="empty"><img src="./assets/img/weiqing/zhgl-02@2x.png"
                                                                              style={{
                                                                                  width: '0.32rem',
                                                                                  height: '0.32rem',
                                                                                  padding: '0px 0.2rem 3px 0px'
                                                                              }}/>用户名</Item>
                <Item extra={memberDetail.memberMobile} arrow="empty"><img src="./assets/img/weiqing/zhgl-08@2x.png"
                                                                         style={{
                                                                             width: '0.32rem',
                                                                             height: '0.32rem',
                                                                             padding: '0px 0.2rem 3px 0px'
                                                                         }}/>手机号</Item>
                <Item arrow="horizontal" onClick={this.showSexSheet} extra={sexs[memberDetail.memberSex]}><img
                    src="./assets/img/weiqing/zhgl-03@2x.png"
                    style={{width: '0.32rem', height: '0.32rem', padding: '0px 0.2rem 3px 0px'}}/>性别</Item>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    {...getFieldProps('memberBirthday', {
                        initialValue: memberBirthday
                    }) }
                    onChange={(date) => this.onChangeBirthday(date)}
                    maxDate={maxDate}
                    minDate={minDate}>
                    <Item arrow="horizontal"><img src="./assets/img/weiqing/zhgl-04@2x.png" style={{
                        width: '0.32rem',
                        height: '0.32rem',
                        padding: '0px 0.2rem 3px 0px'
                    }}/>出生日期</Item>
                </DatePicker>
                <Item arrow="horizontal" onClick={() => {
                    this.gotoAddress()
                }}><img src="./assets/img/weiqing/zhgl-05@2x.png"
                        style={{width: '0.32rem', height: '0.32rem', padding: '0px 0.2rem 3px 0px'}}/>地址管理</Item>
                <Item arrow="horizontal" extra="可修改密码" onClick={() => this.props.router.push('/accountSafe')}><img
                    src="./assets/img/weiqing/zhgl-07@2x.png"
                    style={{width: '0.32rem', height: '0.32rem', padding: '0px 0.2rem 3px 0px'}}/>账户安全</Item>
                <Item arrow="horizontal" onClick={() => this.props.router.push('/my')}><img
                    src="./assets/img/weiqing/zhgl-01@2x.png"
                    style={{width: '0.32rem', height: '0.32rem', padding: '0px 0.2rem 3px 0px'}}/>退出管理</Item>
            </List>
            <WhiteSpace></WhiteSpace>
            {/*<WingBlank style={{position: 'fixed', bottom: '0.5rem', width: '100%', margin: '0px'}}>
                <Button type='primary' onClick={this.logout} style={{
                    height: '0.7rem',
                    borderRadius: '3px',
                    margin: '0px 0.26rem',
                    lineHeight: '0.65rem',
                    backgroundColor: '#00a9e0',
                    borderColor: '#00a9e0'
                }}>退出当前账号</Button>
            </WingBlank>*/}
            <input type="file" ref="head" name="image" style={{display: 'none'}}
                   accept="image/*" onChange={(e) => this.changeFile(e)}/>
        </div>
    }
}

export default withRouter(createForm()(Account));
