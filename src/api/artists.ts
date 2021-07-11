import axios from "@/config/axios";

export interface SingerDetailData {
  artist: {
    name: string;
    picUrl: string;
  };
  hotSongs: {
    id: number;
    name: string;
    al: {
      picUrl: string;
    };
  }[];
}

export default (id: string): Promise<SingerDetailData> =>
  axios.get(`/artists?id=${id}`);
