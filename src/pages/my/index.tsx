import React, {Component} from 'react'
import Taro from "@tarojs/taro";
import {connect} from 'react-redux'
import {Button, OpenData, Text, View} from '@tarojs/components'
import {checkSessionAction, sessionData} from '../../actions/counter'
import './index.less'
import {ICounter} from "../../typings";
import {SERVER_URL} from "../../constants";
import {toast} from "../../utils";

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
        <View>
          <Text>
            在看：1部
            想看：3部
            弃坑：100部
            总共看了：200集
            番剧平均评分：3.2
            我的平均评分：8.2
            今天看了：3集
            本周看了：20集
            超过了30%的网友。。
          </Text>

        </View>
      </View>
    )
  }
}

export default Index;

