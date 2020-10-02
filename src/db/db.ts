import Taro from '@tarojs/taro';
import {ISearchResult} from "../typings";

// const dbSample = {
//   media: [
//     {
//       server: {
//         // b站的数据对象
//         media_id: 'xxxx',
//       },
//       local: {
//         // 本地用户偏好数据
//         state: '在看',
//         score: 4.4, // 用户评分 10满
//         eps: [
//           { id: 15, state: '0/1/时间戳', } // state: 看完，没看，看到某个时间点
//         ],
//       },
//     }
//   ],
// };

export interface ILocalMedia {
  id: string; // media id
  serverData: ISearchResult;
  localData: {
    state: string;
    score: number;
    eps: {
      id: number;
      state: string;
    }[];
  };
}

export const db = {
  media: {
    key: 'media',
    list (): ILocalMedia[] {
      const result = storage.get(this.key);
      if (result) {
        return JSON.parse(result);
      } else {
        return [];
      }
    },
    listByState (state: string): ILocalMedia[] {
      console.log(555, this.list());
      return this.list().filter(obj => obj.localData.state === state);
    },
    update () {

    },
    updateState(data: ISearchResult, newState: string) {
      const list = this.list();
      let newValue;
      const newItem = {
        id: data.media_id,
        serverData: data,
        localData: {
          state: newState,
        },
      };
      if (list.length === 0) {
        // 初始化
        newValue = [newItem];
      } else {
        const result = list.filter(o => o.id === data.media_id);
        if (result.length > 0) {
          // 更新
          newValue = list.map(obj => {
            if (obj.id === data.media_id) {
              return {
                ...obj,
                localData: {
                  ...obj.localData,
                  state: newState,
                },
              };
            }
            return obj;
          });
        } else {
          // 新增
          newValue = [...list, newItem];
        }
      }
      storage.set(this.key, JSON.stringify(newValue));
    },
    getState (mediaId: number) {
      const list = this.list().filter(obj => obj.serverData.media_id === mediaId);
      if (list.length > 0) {
        return list[0].localData.state;
      }
      return null;
    },
  },
};

const storage = {
  get (key): any {
    //
    try {
      var value = Taro.getStorageSync(key);
      if (value) {
        // Do something with return value
        return value;
      }
      return null;
    } catch (e) {
      // Do something when catch error
      return null;
    }
  },
  set (key: string, value: string) {
    try {
      Taro.setStorageSync(key, value);
    } catch (e) {}
  },
}
