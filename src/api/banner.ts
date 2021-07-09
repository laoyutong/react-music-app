import axios from "@/config/axios";

export interface BannerData {
  banners: {
    imageUrl: string;
  }[];
}

export default (): Promise<BannerData> => axios.get("/banner");
