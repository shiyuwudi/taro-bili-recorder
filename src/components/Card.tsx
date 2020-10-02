import {Image, Text, View} from "@tarojs/components";
import React, {ReactNode} from "react";

import './Card.less';

export interface ICardProps {
  src?: string;
  imageStyle?: string;
  text?: string;
  desc?: ReactNode;
  title?: ReactNode;
}

export function Card({src, imageStyle, text, desc, title}: ICardProps) {
  return (
    <View className='episode'>
      <View className={(desc || text) ? 'head bottom-line' : 'head'}>
        {
          src && imageStyle && (
            <View className='cover'>
              <Image
                src={src}
                style={imageStyle}
              />
            </View>
          )
        }
        <View className='title' style={src && imageStyle ? '' : 'flex: 1;margin-left: 0'}>{title}</View>
      </View>
      {
        (desc || text) && (
          <View className='content'>
            {desc || (
              <Text>{text}</Text>
            )}
          </View>
        )
      }
    </View>
  );
}
