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
}

export interface WeappSession {
  
}




