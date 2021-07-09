import axios from "@/config/axios";

export interface SearchSingersData {
  result: {
    artists: {
      id: number;
      name: string;
      picUrl: string;
    }[];
  };
}

export default (keywords: string): Promise<SearchSingersData> =>
  axios.get(`/search/suggest?keywords=${keywords}`);
