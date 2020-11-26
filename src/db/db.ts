import Taro from '@tarojs/taro';
import {Ep, ISearchResult} from "../typings";
import {toast} from "../utils";

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
//           { id: 15, state: '0/1', } // state: 没看, 看完
//         ],
//       },
//     }
//   ],
// };

export interface LocalEp {
  id: number;
  state: string;
}

export interface ILocalMedia {
  id: string; // media id
  serverData: ISearchResult;
  localData: {
    state: string;
    score: number;
    eps: LocalEp[];
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
      return this.list().filter(obj => obj.localData.state === state);
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
    getState (mediaId) {
      const list = this.list().filter(obj => obj.serverData.media_id === mediaId);
      if (list.length > 0) {
        return list[0].localData.state;
      }
      return null;
    },
    getItem (mediaId: number) {
      return this.list().filter(obj => obj.serverData.media_id === mediaId)[0];
    },
    getLocalEps (mediaId: number) {
      const result = this.getItem(mediaId);
      if (result) {
        return result.localData.eps || [];
      }
      return [];
    },
    setEpState (mediaId: string, data: Ep, newState: string) {
      const list = this.list();
      const item = list.filter(obj => obj.id + '' === mediaId)[0];
      if (!item) {
        return toast('数据错误: setEpState');
      }
      let hit = false;
      if (!item.localData.eps) {
        item.localData.eps = [];
      }
      for (let i = 0; i < item.localData.eps.length; i++) {
        const obj = item.localData.eps[i];
        console.log('for', obj.id, data.id);
        if (obj.id === data.id) {
          console.log('hit', newState);
          obj.state = newState;
          hit = true;
          break;
        }
      }
      if (!hit) {
        item.localData.eps.push({
          id: data.id,
          state: newState,
        });
      }
      console.log('setEpState/newList', list);
      storage.set(this.key, JSON.stringify(list));
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
