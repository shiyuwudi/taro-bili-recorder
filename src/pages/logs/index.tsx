import React, {Component} from 'react'
import {connect} from 'react-redux'
import Taro from "@tarojs/taro";
import {ScrollView, View} from '@tarojs/components'
import './index.less'
import {ICounter, ISearchResult} from "../../typings";
import {db, ILocalMedia} from "../../db/db";
import {SearchResult} from "../../components/SearchResult";
import NoData from "../../components/NoData";
import {MEDIA_STATE} from "../../constants";

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
    const data = db.media.listByState(MEDIA_STATE.在看);
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
    let content;
    const { data } = this.state;
    if (!data || data.length === 0) {
      content = (
        <NoData />
      );
    } else {
      content = (
        <ScrollView
          className='desc-scroll-view'
          scrollY
          scrollWithAnimation
        >
          {this.state.data.map(({ id, serverData }) => (
            <View key={id} onClick={() => this.onRowClick(serverData)}>
              <SearchResult data={serverData} />
            </View>
          ))}
        </ScrollView>
      );
    }
    return (
      <View className='log-index'>
        {
          data && data.length > 0 && (
            <View style='margin-bottom: 20px;'>共{data.length}条</View>
          )
        }
        {content}
      </View>
    )
  }
}

export default Index;

