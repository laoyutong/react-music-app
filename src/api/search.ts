import axios from "@/config/axios";

export interface SearchSongsData {
  result: {
    songs: {
      id: number;
      name: string;
      artists: Array<{ img1v1Url: string }>;
    }[];
  };
}

export default (keywords: string): Promise<SearchSongsData> =>
  axios.get(`/search?keywords=${keywords}`);
