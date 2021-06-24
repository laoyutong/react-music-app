import axios from "@/config/axios";
import {
  IBannerData,
  IRecommandListData,
  ISingerListParams,
  ISingerListData,
} from "./types";

export const getBanner = (): Promise<IBannerData> => axios.get("/banner");

export const getRecommandList = (): Promise<IRecommandListData> =>
  axios.get("/personalized");

export const getSingerListRequest = ({
  category,
  alpha,
}: ISingerListParams): Promise<ISingerListData> =>
  axios.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}`);
