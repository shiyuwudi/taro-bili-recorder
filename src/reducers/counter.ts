import {CHANGE_SEASON_ID, SECTION_LOADING} from '../constants/counter'

const INITIAL_STATE = {
  seasonId: '',
  sectionLoading: false,
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_SEASON_ID:
      return {
        ...state,
        seasonId: action.payload,
      }
    case SECTION_LOADING:
      return {
        ...state,
        sectionLoading: action.payload,
      }
     default:
       return state
  }
}
