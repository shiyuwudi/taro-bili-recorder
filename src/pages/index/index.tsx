import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Input, View, Image, Text, ScrollView} from '@tarojs/components'
import {changeMediaIdAction, getSectionAction} from '../../actions/counter'
import './index.less'
import {IEpisode, ICounter, MediaResult, SectionResult} from "../../typings";
import md1 from '../../assets/md1.png';
import md2 from '../../assets/md2.png';

type PageStateProps = {
  counter: ICounter
}

type PageDispatchProps = {
  changeMediaId: (e) => void
  getSection: (seasonId: string) => void
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

function Episode({ data }: { data: IEpisode }) {
  const ratio = 3;
  return (
    <View className='episode'>
      <View className='cover'>
        <Image
          src={data.cover}
          style={`height: ${23 * ratio}px; width: ${37 * ratio}px;`}
        />
      </View>
      <View className='title'>
        <Text>{data.title}.{data.long_title}{data.badge && `(${data.badge})`}</Text>
      </View>
    </View>
  );
}

function MediaData({mediaData, sectionData}: { mediaData: MediaResult, sectionData: SectionResult }) {
  const ratio = 3;
  return (
    <View className='media-result-container'>
      <View className='media-title'>
        <Image
          src={mediaData.media.cover}
          style={`width: ${370 / ratio}px;height: ${493 / ratio}px;background: #fff`}
          mode='scaleToFill'
        />
        <View className='media-desc'>
          <Text className='media-name'>
            {mediaData.media.title}
          </Text>
          <Text className='media-text'>
            地区：{mediaData.media.areas.map(area => area.name).join('，')}
          </Text>
          {mediaData.media.new_ep && mediaData.media.new_ep.index_show && (
            <Text className='media-text'>
              {mediaData.media.new_ep.index_show}
            </Text>
          )}
          {
            mediaData.media.rating && (
              <Text className='media-text'>
                {mediaData.media.rating.count}人，评分{mediaData.media.rating.score}
              </Text>
            )
          }
        </View>
      </View>
      <View className='media-list'>
        {sectionData.main_section.episodes.map(episode => (
          <View key={episode.id} className='episode-wrapper'>
            <Episode data={episode} />
          </View>
        ))}
      </View>
    </View>
  );
}

function MediaHelp() {
  return (
    <ScrollView
      className='scrollview'
      scrollY
      scrollWithAnimation
    >
      <Text className='help-text'>
        怎么获取media id：
      </Text>
      <Image
        style='width: 100%;height: 200px;background: #fff; margin-top: 20px'
        src={md1}
        mode='scaleToFill'
      />
      <Image
        style='width: 100%;height: 200px;background: #fff; margin-top: 20px'
        src={md2}
        mode='scaleToFill'
      />
    </ScrollView>
  );
}

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

  render() {
    const {
      mediaId,
      queryLoading,
      mediaData,
      sectionData,
    } = this.props.counter;
    return (
      <View className='index'>
        <View className='season-input-body'>
          <Input
            type='number'
            placeholder='输入media_id（数字）'
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
          {
            mediaData && sectionData ? (
              <MediaData mediaData={mediaData} sectionData={sectionData} />
            ) : (
              <MediaHelp />
            )
          }
        </View>
      </View>
    )
  }
}

export default Index;

