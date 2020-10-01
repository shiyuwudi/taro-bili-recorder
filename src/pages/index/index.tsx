import React, {Component, ReactNode} from 'react'
import {connect} from 'react-redux'
import {Button, Image, Input, Text, View, ScrollView} from '@tarojs/components'
import {changeMediaIdAction, getSectionAction} from '../../actions/counter'
import './index.less'
import {ICounter, IEpisode, ISearchResult, MediaResult, SectionResult} from "../../typings";

type PageStateProps = {
  counter: ICounter
}

type PageDispatchProps = {
  changeMediaId: (e) => void
  getSection: (seasonId: string) => void
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

export interface ICell1Props {
  src: string;
  imageStyle: string;
  text?: string;
  desc?: ReactNode;
  title?: ReactNode;
}

function Cell1 ({src, imageStyle, text, desc, title}: ICell1Props) {
  return (
    <View className='episode'>
      <View className='head'>
        <View className='cover'>
          <Image
            src={src}
            style={imageStyle}
          />
        </View>
        <View className='title'>{title}</View>
      </View>

      <View className='content'>
        {desc || (
          <Text>{text}</Text>
        )}
      </View>
    </View>
  );
}

function Episode({ data }: { data: IEpisode }) {
  const ratio = 3;
  return (
    <Cell1
      src={data.cover}
      imageStyle={`height: ${23 * ratio}px; width: ${37 * ratio}px;`}
      text={`${data.title}.${data.long_title}${data.badge && data.badge}`}
    />
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

function SearchResult (props: {data : ISearchResult}) {
  const data: ISearchResult = props.data;
  // ep_size: 22
  // eps: (22) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // fix_pubtime_str: ""
  // goto_url: "https://www.bilibili.com/bangumi/play/ss21421/"
  // hit_columns: null
  // hit_epids: ""
  // is_avid: false
  // is_follow: 0
  // is_selection: 1
  // media_id: 8752
  // media_mode: 2
  // media_score: {user_count: 44985, score: 9.8}
  // media_type: 1
  // org_title: "カードキャプターさくら クリアカード編"
  // pgc_season_id: 21421
  // play_state: 0
  // pubtime: 1515254400
  // season_id: 21421
  // season_type: 1
  // season_type_name: "番剧"
  // selection_style: "grid"
  // staff: "原作：CLAMP↵脚本：大川七瀬↵导演：浅香守生↵人物设定：滨田邦彦↵主题歌编曲：河野伸、仓内达矢↵主题歌作曲：水野良树↵系列构成：大川七瀬↵音乐：根岸贵幸↵制作：Madhouse"
  // styles: "少女/魔法/漫画改"
  // url: "https://www.bilibili.com/bangumi/play/ss21421"
  return (
    <View>
      <Cell1
        imageStyle='width: 96px; height: 128px;'
        src={data.cover}
        title={(
          <View>
            <Text>{data.title && data.title.replace(/<em.*?>|<\/em>/g, '')}</Text>
            <Text style='font-size: 15px'>
              {'\n'}共{data.ep_size}集
            </Text>
          </View>
        )}
        desc={(
          <View style='display: flex; flex-direction: column;'>
            <Text>地区：{data.areas}</Text>
            <Text>cv</Text>
            <Text>{data.cv}</Text>
            <Text>简介：{data.desc}</Text>
          </View>
        )}
      />
    </View>
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
      searchResults,
    } = this.props.counter;
    console.log(11, searchResults);
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
              <View key={searchResult.media_id}>
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

