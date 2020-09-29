import Taro from "@tarojs/taro";
import {
  CHANGE_SEASON_ID,
  SECTION_LOADING,
} from '../constants/counter'

export const changeSeasonIdAction = (seasonId) => {
  return {
    type: CHANGE_SEASON_ID,
    payload: seasonId,
  }
}

export const sectionLoading = (payload) => {
  return {
    type: SECTION_LOADING,
    payload: payload,
  }
}

export const getSectionAction = (seasonId: string) => {
  return dispatch => {
    // setTimeout(() => {
    //   dispatch(add())
    // }, 2000)
    (async () => {
      dispatch(sectionLoading(true));
      const resp = await Taro.request({
        url: `https://api.bilibili.com/pgc/web/season/section?season_id=${seasonId}`,
      });
      dispatch(sectionLoading(false));
      console.log(111, resp.data);
    })();
  }
}
