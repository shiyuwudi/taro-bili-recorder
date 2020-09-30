import React, {Component} from 'react'
import Taro from "@tarojs/taro";
import {connect} from 'react-redux'
import {Image, View, Button, Text} from '@tarojs/components'
import {checkSessionAction} from '../../actions/counter'
import './index.less'
import {ICounter} from "../../typings";
import empty from '../../assets/avatar_default.png';

type PageStateProps = {
  counter: ICounter;
}

type PageDispatchProps = {
  checkSession: () => void;
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  checkSession () {
    dispatch(checkSessionAction());
  },
}))
class Index extends Component<IProps> {

  componentDidShow () {
    this.props.checkSession();
  }

  login() {
    // Taro.login({
    //   success: function (res) {
    //     if (res.code) {
    //       (async () => {
    //         //发起网络请求
    //         const resp = await Taro.request({
    //           url: 'https://test.com/onLogin',
    //           data: {
    //             code: res.code
    //           }
    //         });
    //         console.log("登录成功！", res)
    //       })();
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });

    (async () => {
      const resp = await Taro.request({
        url: 'https://ec2-13-59-31-76.us-east-2.compute.amazonaws.com/',
      });
      console.log("resp", resp);
    })();
  }

  render () {
    const {
      session,
    } = this.props.counter;
    return (
      <View className='container'>
        <View className='header'>
          <View className='image-con center-item'>
            <Image src={empty} style='width:44px; height: 44px; border-radius: 22px' /> 
          </View>
          <View className='login-button-wrapper center-item'>
            {session ? (
              <Text>{JSON.stringify(session, null, 2)}</Text>
            ) : (
              <Button className='login-button' type='primary' size='mini' onClick={this.login}>点击登录</Button>
            )}
          </View>
        </View>
      </View>
    )
  }
}

export default Index;

