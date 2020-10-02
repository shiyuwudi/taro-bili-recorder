import React, {Component} from 'react'
import {connect} from 'react-redux'
import Taro from "@tarojs/taro";
import {ScrollView, View} from '@tarojs/components'
import './index.less'
import {ICounter, ISearchResult} from "../../typings";
import {db, ILocalMedia} from "../../db/db";
import {SearchResult} from "../../components/SearchResult";

type PageStateProps = {
  counter: ICounter;
}

type PageDispatchProps = {
  changeSeasonId: (e) => void
  getSection: (seasonId: string) => void
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

export interface IState {
  data: ILocalMedia[];
}

@connect(({ counter }) => ({
  counter
}))
class Index extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidShow () {
    const data = db.media.listByState('想看');
    this.setState({
      data,
    });
  }

  query = () => {
    this.props.getSection(this.props.counter.mediaId);
  }

  onRowClick = (data: ISearchResult) => {
    console.log('onRowClick', data);
    // 传入参数 id=2&type=test
    Taro.navigateTo({
      url: '/pages/detail/index?mediaId=' + data.media_id,
    })
  };

  render () {
    return (
      <View className='log-index'>
        <ScrollView
          className='desc-scroll-view'
          scrollY
          scrollWithAnimation
        >
          {this.state.data.map(({ id, serverData }) => (
            <View key={id} onClick={() => this.onRowClick(serverData)}>
              <SearchResult data={serverData} />
              {/*{JSON.stringify(serverData,null,2)}*/}
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

export default Index;

