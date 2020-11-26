import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Label, Radio, RadioGroup, ScrollView, Text, View} from '@tarojs/components'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import moment from 'moment';
import './index.less'
import {Ep, ICounter, ISearchResult} from "../../typings";
import {Card} from "../../components/Card";
import {Table} from "../../components/Table";
import {db, LocalEp} from "../../db/db";
import {toast} from "../../utils";
import {EP_STATE, MEDIA_STATE} from "../../constants";

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
  data?: ISearchResult;
  state?: string;
  mediaId?: string;
}

export interface IPageRadioProps {
  onStateChange: (e: any) => void;
  value?: string;
}

export interface IPageRadioState {
  list: any[];
}

class PageRadio extends Component<IPageRadioProps, IPageRadioState> {
  constructor(props) {
    super(props);
    const state = props.value;
    const initialState = {
      list: [
        {
          value: MEDIA_STATE.想看,
          text: MEDIA_STATE.想看,
          checked: false
        },
        {
          value: MEDIA_STATE.在看,
          text: MEDIA_STATE.在看,
          checked: false
        },
        {
          value: MEDIA_STATE.弃坑,
          text: MEDIA_STATE.弃坑,
          checked: false
        },
      ]
    };
    if (state) {
      initialState.list.forEach(item => {
        if (item.value === state) {
          item.checked = true;
        }
      });
    }
    this.state = initialState;
  };
  render () {
    return (
      <View className='container'>
        <Text className='title'>状态</Text>
        <View className='content' >
          <RadioGroup className='radio-group' onChange={this.props.onStateChange}>
            {this.state.list.map((item, i) => {
              return (
                <Label className='radio-list__label' for={i + ''} key={i}>
                  <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                </Label>
              )
            })}
          </RadioGroup>
        </View>
      </View>
    )
  }
}

@connect(({ counter }) => ({
  counter
}))
class Index extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
    this.onEpClick = this.onEpClick.bind(this);
  }

  componentDidMount () {
    const { mediaId, from } = getCurrentInstance().router!.params;
    if (from === 'index') {
      const { searchResults } = this.props.counter;
      const data = searchResults.filter(obj => obj.media_id+'' === mediaId)[0];
      const result: string = db.media.getState(data.media_id);
      this.setState({
        data,
        state: result,
        mediaId,
      });
    } else {
      const arr = db.media.list();
      const data = arr.filter(obj => obj.id + '' === mediaId)[0];
      const result: string = db.media.getState(data.id);
      this.setState({
        data: data.serverData,
        state: result,
        mediaId,
      });
    }
  }

  renderDesc (data: ISearchResult) {
    // goto_url: "https://www.bilibili.com/bangumi/play/ss21421/"
    return (
      <ScrollView
        className='desc-scroll-view'
        scrollY
        scrollWithAnimation
        style='height: 150px;'
      >
        <View style='display: flex; flex-direction: column;'>
          <Table
            dataObject={data}
            columns={[
              { title: '原名', key: 'org_title', dataIndex: 'org_title' },
              { title: '发布日期', key: 'pubtime', dataIndex: 'pubtime', render: o => moment(o * 1000).format('YYYY/MM/DD') },
              { title: '地区', key: 'areas', dataIndex: 'areas' },
              { title: 'CV', key: 'cv', dataIndex: 'cv' },
              { title: '简介', key: 'desc', dataIndex: 'desc' },
              { title: '制作组', key: 'staff', dataIndex: 'staff' },
              { title: '类型', key: 'styles', dataIndex: 'styles' },
            ]}
          />
        </View>
      </ScrollView>
    );
  }

  onEpClick (ep: Ep) {
    // id: 172119
    console.log('onEpClick', ep);
    const { refresh } = this;
    const { state, mediaId } = this.state;
    const itemList = [EP_STATE.没看, EP_STATE.看过];
    Taro.showActionSheet({
      itemList,
      success: function (res: any) {
        if (state !== MEDIA_STATE.在看) {
          return toast('请先标记在看');
        }
        if (!mediaId) {
          return toast('数据错误: mediaId');
        }
        db.media.setEpState(mediaId, ep, itemList[res.tapIndex]);
        refresh();
      },
    })
  }

  refresh = () => {
    this.forceUpdate();
    toast('标记成功');
  };

  renderEp = (data: Ep, localEps: LocalEp[]) => {
    // url: "https://www.bilibili.com/bangumi/play/ep173305"
    const t = data.badges.map(o => o.text).join('/');
    const badgeText = t ? `(${t})` : '';
    const text = `${data.title}.${data.long_title}${badgeText}`;
    const ratio = 3;
    let badge = EP_STATE.没看;
    let badgeClassName = 'watch_0';
    const match = localEps.filter(localEp => localEp.id === data.id)[0];
    if (match) {
      badge = match.state;
      if (badge === EP_STATE.看过) {
        badgeClassName = 'watch_1';
      }
    }
    const title = (
      <View className='ep-con'>
        <Text className='title'>{text}</Text>
      </View>
    );
    const desc = (
      <Text className={`badge ${badgeClassName}`}>{badge}</Text>
    );
    return (
      <View onClick={() => this.onEpClick(data)}>
        <Card
          imageStyle={`height: ${23 * ratio}px; width: ${37 * ratio}px;`}
          src={data.cover}
          title={title}
          desc={desc}
        />
      </View>
    );
  }

  onStateChange = (e) => {
    console.log('onStateChange', e);
    const newState = e.detail.value;
    // 入库
    if (!this.state.data) return;
    db.media.updateState(this.state.data, newState);
    this.setState({
      state: newState,
    })
  }

  render () {
    const { data, mediaId } = this.state;
    if (!data) return false;
    let localEps = [];
    if (mediaId) {
      localEps = db.media.getLocalEps(+mediaId)
    }
    console.log('localEps', localEps);
    return (
      <View className='main'>
        <ScrollView
          scrollY
          scrollWithAnimation
        >
          <Card
            imageStyle='width: 96px; height: 128px;'
            src={data.cover}
            title={(
              <View style='display: flex; flex-direction: column;'>
                <Text>
                  {data.title && data.title.replace(/<em.*?>|<\/em>/g, '')}
                </Text>
                <Text style='font-size: 12px;margin-top: 20px;'>
                  共{data.ep_size}集
                </Text>
                {data.media_score && (
                  <View style='font-size: 12px;'>
                    <Text style='font-size: 15px; color: red; font-weight: bolder;'>{data.media_score.score}</Text>分（{data.media_score.user_count}人）
                  </View>
                )}
              </View>
            )}
            desc={this.renderDesc(data)}
          />
          <Card
            title={(
              <PageRadio
                value={this.state.state}
                onStateChange={this.onStateChange}
              />
            )}
          />
          {
            data.eps.map(ep => (<View key={ep.id}>{this.renderEp(ep, localEps)}</View>))
          }
        </ScrollView>
      </View>
    )
  }
}

export default Index;

