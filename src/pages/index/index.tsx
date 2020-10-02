import React, {Component} from 'react'
import Taro from '@tarojs/taro';
import {connect} from 'react-redux'
import {Button, Input, ScrollView, View} from '@tarojs/components'
import {changeMediaIdAction, getSectionAction} from '../../actions/counter'
import './index.less'
import {ICounter, ISearchResult} from "../../typings";
import {SearchResult} from "../../components/SearchResult";


type PageStateProps = {
  counter: ICounter
}

type PageDispatchProps = {
  changeMediaId: (e) => void
  getSection: (seasonId: string) => void
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(({counter}) => ({
  counter
}), (dispatch) => ({
  changeMediaId(mediaId) {
    dispatch(changeMediaIdAction(mediaId));
  },
  getSection(mediaId: string) {
    dispatch(getSectionAction(mediaId));
  },
}))
class Index extends Component<IProps> {

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

  render() {
    const {
      mediaId,
      queryLoading,
      searchResults,
    } = this.props.counter;
    return (
      <View className='index'>
        <View className='season-input-body'>
          <Input
            type='number'
            placeholder='请输入神秘代码，如28229293'
            style={{marginBottom: 20}}
            value={mediaId}
            onInput={e => this.props.changeMediaId(e.detail.value)}
            placeholderClass='season-input-placeholder'
          />
          <Button
            type='primary'
            disabled={!mediaId}
            onClick={this.query}
            loading={queryLoading}
            className='media-button'
          >{queryLoading ? '正在查询' : '查询番剧'}</Button>

          {/*{*/}
          {/*  mediaData && sectionData && (*/}
          {/*    <MediaData mediaData={mediaData} sectionData={sectionData} />*/}
          {/*  )*/}
          {/*}*/}

          <ScrollView
            className='search-scroll-view'
            scrollY
            scrollWithAnimation
            style='margin-top: 20px'
          >
            {searchResults.map(searchResult => (
              <View key={searchResult.media_id} onClick={() => this.onRowClick(searchResult)}>
                <SearchResult data={searchResult} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Index;

