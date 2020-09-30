import Taro from "@tarojs/taro";
import {
  CHANGE_MEDIA_ID,
  SECTION_LOADING,
  MEDIA_DATA,
  SECTION_DATA,
  SESSION_DATA,
} from '../constants/counter'
import {IMediaResponse, ISectionResponse} from "../typings";

export const changeMediaIdAction = (seasonId) => {
  return {
    type: CHANGE_MEDIA_ID,
    payload: seasonId,
  }
}

const queryLoading = (payload) => {
  return {
    type: SECTION_LOADING,
    payload: payload,
  }
}

export const mediaDataAction = (payload) => ({ type: MEDIA_DATA, payload });
export const sectionDataAction = (payload) => ({ type: SECTION_DATA, payload });
export const sessionData = (payload) => ({ type: SESSION_DATA, payload });

export const getSectionAction = (mediaId: string) => {
  return dispatch => {
    (async () => {
      dispatch(queryLoading(true));
      console.log('mediaId', mediaId);
      const resp0 = await Taro.request({
        url: `https://api.bilibili.com/pgc/review/user?media_id=${mediaId}`,
      });
      const mediaResponse: IMediaResponse = resp0.data;
      if (mediaResponse.code !== 0) {
        Taro.showToast({
          title: mediaResponse.message,
        });
        dispatch(queryLoading(false));
        return;
      }
      dispatch(mediaDataAction(mediaResponse.result));
      const resp1 = await Taro.request({
        url: `https://api.bilibili.com/pgc/web/season/section?season_id=${mediaResponse.result.media.season_id}`,
      });
      const sectionResponse: ISectionResponse = resp1.data;
      if (sectionResponse.code !== 0) {
        Taro.showToast({
          title: sectionResponse.message,
        });
        dispatch(queryLoading(false));
        return;
      }
      dispatch(sectionDataAction(sectionResponse.result));
      dispatch(queryLoading(false));
      console.log('media data', mediaResponse.result);
      console.log('section data', sectionResponse.result);
    })();
  }
}

export const checkSessionAction = () => {
  return dispatch => {
    Taro.checkSession({
      success: function (data) {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("check session success", data);
        if (data.errMsg !== "checkSession:ok") {
          dispatch(sessionData(data));
        } else {
          dispatch(sessionData(null));
        }
      },
      fail: function (err) {
        // session_key 已经失效，需要重新执行登录流程
        console.log("check session failed", err);
        dispatch(sessionData(null));
      }
    })
  }
}
