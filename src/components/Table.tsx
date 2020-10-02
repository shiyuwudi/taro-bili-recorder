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
  }[]
}

export function Table<T> (props: ITableProps<T>) {
  const { dataObject, columns } = props;
  return (
    <View className='table'>
      {
        columns
          .filter(o => (dataObject as any).hasOwnProperty(o.dataIndex))
          .map(({ key, dataIndex, title, render }) => (
            <View key={key} className='row'>
              <View className='key'>{title}</View>
              <Text className='value'>
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
