import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Image, Text, View} from '@tarojs/components'
import {changeMediaIdAction, getSectionAction} from '../../actions/counter'
import './index.less'
import {ICounter} from "../../typings";
import empty from '../../assets/empty.jpeg';

type PageStateProps = {
  counter: ICounter;
}

type PageDispatchProps = {
  changeSeasonId: (e) => void
  getSection: (seasonId: string) => void
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  changeSeasonId (seasonId) {
    dispatch(changeMediaIdAction(seasonId));
  },
  getSection (seasonId: string) {
    dispatch(getSectionAction(seasonId));
  },
}))
class Index extends Component<IProps> {

  query = () => {
    this.props.getSection(this.props.counter.mediaId);
  }

  render () {
    const ratio = 5;
    return (
      <View className='log-index'>
        <View className='no-result'>
          <Text className='title'>暂无记录</Text>
          <Text className='content'>在搜索页面查询后，添加的番剧会出现在这里</Text>
          <Image src={empty} style={`width:${660/ratio}px; height:${726/ratio}px`} />
        </View>
      </View>
    )
  }
}

export default Index;

