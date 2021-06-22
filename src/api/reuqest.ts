import axios from "@/config/axios";
import { IBannerData } from "./types";

export const getBanner = (): Promise<IBannerData> => axios.get("/banner");
