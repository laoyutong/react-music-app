import axios from "@/config/axios";

export interface AlbumDetailData {
  playlist: {
    name: string;
    coverImgUrl: string;
    tracks: {
      id: number;
      name: string;
      al: {
        picUrl: string;
      };
    }[];
  };
}

export default (id: string): Promise<AlbumDetailData> =>
  axios.get(`/playlist/detail?id=${id}`);
