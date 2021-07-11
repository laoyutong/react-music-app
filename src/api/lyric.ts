import axios from "@/config/axios";

export interface LyricData {
  lrc: {
    lyric: string;
  };
  nolyric:boolean
}

export default (id: number): Promise<LyricData> => axios.get(`/lyric?id=${id}`);
