import axios from "@/config/axios";

export interface SingerListParams {
  category: string;
  alpha: string;
}

export interface SingerListData {
  artists: {
    id: number;
    picUrl: string;
    name: string;
  }[];
}

export default ({
  category,
  alpha,
}: SingerListParams): Promise<SingerListData> =>
  axios.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}`);
