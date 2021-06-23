import React, { useEffect, useState } from "react";
import "./index.less";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import LazyLoad from "react-lazyload";

import { getBanner, getRecommandList } from "@/api/reuqest";
import type { IBannerData, IRecommandListData } from "@/api/types";

const Home = (): JSX.Element => {
  const [bannerList, setBannerList] = useState<IBannerData["banners"]>([]);

  const bannerImageList = bannerList.map((banner) => banner.imageUrl);

  useEffect(() => {
    (async () => {
      const { banners } = await getBanner();
      setBannerList(banners);
    })();
  }, []);

  const [recommandList, setRecommandList] = useState<
    IRecommandListData["result"]
  >([]);

  useEffect(() => {
    (async () => {
      const { result } = await getRecommandList();
      setRecommandList(result);
    })();
  }, []);

  return (
    <div className="home-container">
      <Swiper>
        {bannerImageList.map((url, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <img src={url} />
          </SwiperSlide>
        ))}
        {recommandList.map((recommand) => (
          <div key={recommand.id} className="recommand-item">
            <LazyLoad>
              <img src={recommand.picUrl} alt="" />
            </LazyLoad>
            <div className="recommand-name">{recommand.name}</div>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
