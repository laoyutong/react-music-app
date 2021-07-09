import axios from "@/config/axios";

export interface RecommandListData {
  result: {
    id: number;
    name: string;
    picUrl: string;
  }[];
}

export default (): Promise<RecommandListData> => axios.get("/personalized");
