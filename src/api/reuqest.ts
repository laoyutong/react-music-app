import axios from "@/config/axios";
import {
  IBannerData,
  IRecommandListData,
  ISingerListParams,
  ISingerListData,
  IRankListData,
  ISearchHotListData,
  ISearchSingersData,
  ISearchSongsData,
  ISingerDetailData,
} from "./types";

export const getBanner = (): Promise<IBannerData> => axios.get("/banner");

export const getRecommandList = (): Promise<IRecommandListData> =>
  axios.get("/personalized");

export const getSingerListRequest = ({
  category,
  alpha,
}: ISingerListParams): Promise<ISingerListData> =>
  axios.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}`);

export const getRankList = (): Promise<IRankListData> =>
  axios.get("/toplist/detail");

export const getSearchHotList = (): Promise<ISearchHotListData> =>
  axios.get("/search/hot");

export const getSearchSongs = (keywords: string): Promise<ISearchSongsData> =>
  axios.get(`/search?keywords=${keywords}`);

export const getSearchSingers = (
  keywords: string
): Promise<ISearchSingersData> =>
  axios.get(`/search/suggest?keywords=${keywords}`);

export const getSingerDetail = (id: string): Promise<ISingerDetailData> =>
  axios.get(`/artists?id=${id}`);
