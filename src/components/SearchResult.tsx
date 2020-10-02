import React from "react";
import {Text, View} from "@tarojs/components";

import {ISearchResult} from "../typings";
import {Card} from "./Card";

export function SearchResult(props: { data: ISearchResult }) {
  const data: ISearchResult = props.data;
  return (
    <View>
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
                <Text
                  style='font-size: 15px; color: red; font-weight: bolder;'>{data.media_score.score}</Text>分（{data.media_score.user_count}人）
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
