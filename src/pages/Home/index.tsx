import React, { useEffect, useState } from "react";
import "./index.less";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import { getBanner } from "@/api/reuqest";
import type { IBannerData } from "@/api/types";

const Home = () => {
  const [bannerList, setBannerList] = useState<IBannerData["banners"]>([]);

  const bannerImageList = bannerList.map((banner) => banner.imageUrl);

  useEffect(() => {
    const fetchBanner = async () => {
      const { banners } = await getBanner();
      setBannerList(banners);
    };
    fetchBanner();
  }, []);

  return (
    <>
      <Swiper>
        {bannerImageList.map((url, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <img src={url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Home;
