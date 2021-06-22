import axios from "@/config/axios";
import { IBannerData, IRecommandListData } from "./types";

export const getBanner = (): Promise<IBannerData> => axios.get("/banner");

export const getRecommandList = (): Promise<IRecommandListData> =>
  axios.get("/personalized");
