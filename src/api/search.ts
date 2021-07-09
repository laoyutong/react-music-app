import axios from "@/config/axios";

export interface SearchSongsData {
    result: {
      songs: {
        id: string;
        name: string;
      }[];
    };
  }

export default (keywords: string): Promise<SearchSongsData> =>
  axios.get(`/search?keywords=${keywords}`);
