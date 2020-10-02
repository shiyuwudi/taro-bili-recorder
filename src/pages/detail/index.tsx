import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ScrollView, Text, View, Radio, RadioGroup, Label} from '@tarojs/components'
import {getCurrentInstance} from '@tarojs/taro'
import moment from 'moment';

import {changeMediaIdAction, getSectionAction} from '../../actions/counter'
import './index.less'
import {Ep, ICounter, ISearchResult} from "../../typings";
import {Card} from "../../components/Card";
import {Table} from "../../components/Table";
import {db} from "../../db/db";

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
          value: '想看',
          text: '想看',
          checked: false
        },
        {
          value: '在看',
          text: '在看',
          checked: false
        },
        {
          value: '弃坑',
          text: '弃坑',
          checked: false
        },
      ]
    };
    console.log(444, state);
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
}), (dispatch) => ({
  changeSeasonId (seasonId) {
    dispatch(changeMediaIdAction(seasonId));
  },
  getSection (seasonId: string) {
    dispatch(getSectionAction(seasonId));
  },
}))
class Index extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount () {
    const mediaId = getCurrentInstance().router!.params.mediaId;
    const { searchResults } = this.props.counter;
    const data = searchResults.filter(obj => obj.media_id+'' === mediaId)[0];
    const result: string = db.media.getState(data.media_id);
    this.setState({
      data,
      state: result,
    });
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

  renderEp (data: Ep) {
    // url: "https://www.bilibili.com/bangumi/play/ep173305"
    const text = `${data.title}.${data.long_title}${data.badges.join('/')}`;
    const ratio = 3;
    return (
      <Card
        imageStyle={`height: ${23 * ratio}px; width: ${37 * ratio}px;`}
        src={data.cover}
        title={<Text style='font-style: italic; font-size: 15px; font-weight: 100;'>{text}</Text>}
      />
    );
  }

  onStateChange = (e) => {
    console.log('onStateChange', e);
    const newState = e.detail.value;
    // 入库
    if (!this.state.data) return;
    db.media.updateState(this.state.data, newState);
  }

  render () {
    const { data } = this.state;
    if (!data) return false;
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
            data.eps.map(ep => (<View key={ep.id}>{this.renderEp(ep)}</View>))
          }
        </ScrollView>
      </View>
    )
  }
}

export default Index;

