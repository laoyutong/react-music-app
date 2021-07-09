import axios from "@/config/axios";

export interface SearchHotListData {
  result: {
    hots: {
      first: string;
    }[];
  };
}

export default (): Promise<SearchHotListData> => axios.get("/search/hot");
