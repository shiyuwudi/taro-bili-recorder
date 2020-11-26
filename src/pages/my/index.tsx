import React, {Component} from 'react'
import Taro from "@tarojs/taro";
import {connect} from 'react-redux'
import {Button, OpenData, View} from '@tarojs/components'
import {checkSessionAction, sessionData} from '../../actions/counter'
import './index.less'
import {ICounter} from "../../typings";
import {SERVER_URL} from "../../constants";
import {toast} from "../../utils";
import {Table} from "../../components/Table";

type PageStateProps = {
  counter: ICounter;
}

type PageDispatchProps = {
  checkSession: () => void;
  loginSuccess: (openid: string) => void;
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  checkSession () {
    dispatch(checkSessionAction());
  },
  loginSuccess (openid: string) {
    dispatch(sessionData({ openid }));
  },
}))
class Index extends Component<IProps> {

  componentDidShow () {
    this.props.checkSession();
  }

  login = () => {
    const loginSuccess = this.props.loginSuccess;
    Taro.login({
      success: function (res) {
        if (res.code) {
          (async () => {
            console.log("登录成功！微信返回", res);
            // 发起网络请求
            const resp = await Taro.request({
              url: `${SERVER_URL}/wx/login`,
              method: "POST",
              data: {
                code: res.code,
              }
            });
            console.log('后台返回', resp);
            const { success, data } = resp.data;
            if (success && data && data.openid) {
              loginSuccess(data.openid);
              toast('欢迎回来，主人！');
            } else {
              toast('后台登录失败！' + JSON.stringify(resp.data));
            }
          })();
        } else {
          toast('微信登录失败！');
          console.log('微信登录失败！' + res.errMsg)
        }
      }
    });
  }

  render () {
    const {
      session,
    } = this.props.counter;
    const dataObject = {
      '在看': '1',
      '想看': '3',
      '弃坑': '100',
      '总共看了': '200',
      '番剧平均评分': 3.2,
      '今天看了': '3',
      '本周看了': '20',
      '本月看了': '100',
    };
    const columns = [
      {title: '在看', render: o => o + '部' },
      {title: '想看', render: o => o + '部' },
      {title: '弃坑', render: o => o + '部' },
      {title: '番剧平均评分', render: o => o + '分' },
      {title: '总共看了', render: o => o + '集' },
      {title: '今天看了', render: o => o + '集' },
      {title: '本周看了', render: o => o + '集' },
      {title: '本月看了', render: o => o + '集' },
    ].map(o => ({
      ...o,
      key: o.title,
      dataIndex: o.title,
    }));
    return (
      <View className='container'>
        <View className='header'>
          <View className='avatar'>
            <OpenData type='userAvatarUrl' />
          </View>
          <View className='login-button-wrapper center-item'>
            {session ? (
              <OpenData type='userNickName' />
            ) : (
              <Button className='login-button' type='primary' size='mini' onClick={this.login}>点击登录</Button>
            )}
          </View>
        </View>
        <View className='chart'>
          <Table
            dataObject={dataObject}
            columns={columns}
            keyRatio={0.5}
          />
        </View>
      </View>
    )
  }
}

export default Index;

