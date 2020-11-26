import React from "react";
import {Image, Text, View} from "@tarojs/components";
import './NoData.less';

import empty from "../assets/empty.jpeg";

export default function NoData() {
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
