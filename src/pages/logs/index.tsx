import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, View} from '@tarojs/components'
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
  //   console.log(this.props, nextProps
  // }

  componentWillUnmount () { }

  componentDidShow () {}

  componentDidHide () { }

  query = () => {
    this.props.getSection(this.props.counter.seasonId);
  }

  render () {
    return (
      <View className='index'>
        <Text>555</Text>
      </View>
    )
  }
}

export default Index;

