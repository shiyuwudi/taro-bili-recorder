// media
export interface Area {
  id: number;
  name: string;
}

export interface NewEp {
  id: number;
  index: string;
  index_show: string;
}

export interface Rating {
  count: number;
  score: number;
}

export interface Media {
  areas: Area[];
  cover: string;
  media_id: number;
  new_ep: NewEp;
  rating: Rating;
  season_id: number;
  share_url: string;
  title: string;
  type_name: string;
}

export interface Review {
  is_coin: number;
  is_open: number;
}

export interface MediaResult {
  media: Media;
  review: Review;
}

export interface IMediaResponse {
  code: number;
  message: string;
  result: MediaResult;
}

// section
export interface BadgeInfo {
  bg_color: string;
  bg_color_night: string;
  text: string;
}

export interface IEpisode {
  aid: number;
  badge: string;
  badge_info: BadgeInfo;
  badge_type: number;
  cid: number;
  cover: string;
  from: string;
  id: number;
  is_premiere: number;
  long_title: string;
  share_url: string;
  status: number;
  title: string;
  vid: string;
}

export interface MainSection {
  episodes: IEpisode[];
  id: number;
  title: string;
  type: number;
}

export interface BadgeInfo2 {
  bg_color: string;
  bg_color_night: string;
  text: string;
}

export interface Episode2 {
  aid: number;
  badge: string;
  badge_info: BadgeInfo2;
  badge_type: number;
  cid: number;
  cover: string;
  from: string;
  id: number;
  is_premiere: number;
  long_title: string;
  share_url: string;
  status: number;
  title: string;
  vid: string;
}

export interface Section {
  episodes: Episode2[];
  id: number;
  title: string;
  type: number;
}

export interface SectionResult {
  main_section: MainSection;
  section: Section[];
}

export interface ISectionResponse {
  code: number;
  message: string;
  result: SectionResult;
}

export interface ICounter {
  mediaId: string;
  queryLoading: boolean;
  mediaData: null | MediaResult;
  sectionData: null | SectionResult;
  session: null | WeappSession;
  searchResults: ISearchResult[];
}

export interface WeappSession {}

// 搜索结果
export interface MediaScore {
  user_count: number;
  score: number;
}

export interface Ep {
  id: number;
  cover: string;
  title: string;
  url: string;
  release_date: string;
  badges: any[];
  index_title: string;
  long_title: string;
}

export interface ISearchResult {
  media_id: number;
  season_id: number;
  type: string;
  title: string;
  org_title: string;
  cover: string;
  media_type: number;
  areas: string;
  styles: string;
  cv: string;
  staff: string;
  play_state: number;
  goto_url: string;
  desc: string;
  corner: number;
  pubtime: number;
  media_mode: number;
  is_avid: boolean;
  fix_pubtime_str: string;
  media_score: MediaScore;
  hit_columns?: any;
  all_net_name: string;
  all_net_icon: string;
  all_net_url: string;
  angle_title: string;
  angle_color: number;
  display_info: any[];
  hit_epids: string;
  pgc_season_id: number;
  season_type: number;
  season_type_name: string;
  selection_style: string;
  ep_size: number;
  url: string;
  button_text: string;
  is_follow: number;
  is_selection: number;
  eps: Ep[];
  badges: any[];
}








