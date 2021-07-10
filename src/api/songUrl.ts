import axios from "@/config/axios";

interface SongUrlData {
  data: {
    url: string;
  }[];
}

export default (id: number): Promise<SongUrlData> =>
  axios.get(`/song/url?id=${id}`);
