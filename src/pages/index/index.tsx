import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Input, View} from '@tarojs/components'
import {changeSeasonIdAction, getSectionAction} from '../../actions/counter'
import './index.less'

type PageStateProps = {
  counter: {
    seasonId: string,
    sectionLoading: boolean,
  }
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
    dispatch(changeSeasonIdAction(seasonId));
  },
  getSection (seasonId: string) {
    dispatch(getSectionAction(seasonId));
  },
}))
class Index extends Component<IProps> {
  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  componentWillUnmount () { }

  componentDidShow () {}

  componentDidHide () { }

  query = () => {
    this.props.getSection(this.props.counter.seasonId);
  }

  render () {
    const { seasonId, sectionLoading } = this.props.counter;
    return (
      <View className='index'>

        <View className='season-input-body'>
          <Input
            type='number'
            placeholder='输入season_id（数字）'
            focus
            style={{ marginBottom: 20 }}
            value={seasonId}
            onInput={e => this.props.changeSeasonId(e.detail.value)}
            placeholderClass='season-input-placeholder'
          />
          <Button
            type='primary'
            disabled={!seasonId}
            onClick={this.query} loading={sectionLoading}
          >{sectionLoading ? '正在查询' : '查询番剧' }</Button>
        </View>
      </View>
    )
  }
}

export default Index;

