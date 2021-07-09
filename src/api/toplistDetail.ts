import axios from "@/config/axios";

export interface RankListData {
  list: {
    id: number;
    name: string;
    description: string;
    coverImgUrl: string;
  }[];
}

export default (): Promise<RankListData> => axios.get("/toplist/detail");
