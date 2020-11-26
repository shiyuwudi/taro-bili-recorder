import React, {ReactNode} from 'react';
import { View,Text } from '@tarojs/components';

import './Table.less';

export interface ITableProps<T> {
  dataObject: T;
  columns: {
    title: string;
    key: string;
    dataIndex: string;
    render?: (o: any) => ReactNode;
  }[];
  keyRatio?: number;
}

export function Table<T> (props: ITableProps<T>) {
  const { dataObject, columns, keyRatio = 0.2 } = props;
  const keyFlex = Math.floor(100 * keyRatio);
  const valueFlex = 100 - keyFlex;

  return (
    <View className='table'>
      {
        columns
          .filter(o => (dataObject as any).hasOwnProperty(o.dataIndex))
          .map(({ key, dataIndex, title, render }) => (
            <View key={key} className='row'>
              <View className='key' style={`flex: ${keyFlex}`}>{title}</View>
              <Text className='value' style={`flex: ${valueFlex}`}>
                {
                  render ? render(dataObject[dataIndex]) : dataObject[dataIndex]
                }
              </Text>
            </View>
          ))
      }
    </View>
  );
}
