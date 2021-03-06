import {
  CHANGE_MEDIA_ID,
  SECTION_LOADING,
  MEDIA_DATA,
  SECTION_DATA,
  SESSION_DATA, SEARCH_RESULTS,
} from '../constants/counter'
import {ICounter} from "../typings";
import {IS_DEV} from "../constants";
import {sampleMedia, sampleSection} from "../constants/mock";

const INITIAL_STATE: ICounter = {
  mediaId: IS_DEV ? '小樱' : '',
  queryLoading: false,
  mediaData: IS_DEV ? sampleMedia : null,
  sectionData: IS_DEV ? sampleSection : null,
  session: null,
  searchResults: [],
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MEDIA_DATA:
      return {
        ...state,
        mediaData: action.payload,
      }
    case SECTION_DATA:
      return {
        ...state,
        sectionData: action.payload,
      }
    case CHANGE_MEDIA_ID:
      return {
        ...state,
        mediaId: action.payload,
      }
    case SECTION_LOADING:
      return {
        ...state,
        queryLoading: action.payload,
      }
    case SESSION_DATA:
      return {
        ...state,
        session: action.payload,
      }
    case SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: action.payload,
      }
    }
     default:
       return state
  }
}
