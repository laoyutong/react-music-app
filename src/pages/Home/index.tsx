import React, { useEffect, useState } from "react";
import "./index.less";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import LazyLoad from "react-lazyload";

import bannerApi, { BannerData } from "@/api/banner";
import personalizedApi, { RecommandListData } from "@/api/personalized";
import type { IRouterComponentProps } from "@/router";

const Home = ({ changeRouter }: IRouterComponentProps): JSX.Element => {
  const [bannerList, setBannerList] = useState<BannerData["banners"]>([]);

  const bannerImageList = bannerList.map((banner) => banner.imageUrl);

  useEffect(() => {
    (async () => {
      const { banners } = await bannerApi();
      setBannerList(banners);
    })();
  }, []);

  const [recommandList, setRecommandList] = useState<
    RecommandListData["result"]
  >([]);

  useEffect(() => {
    (async () => {
      const { result } = await personalizedApi();
      setRecommandList(result);
    })();
  }, []);

  const handleClick = (id: number) => {
    changeRouter(`/albumDetail?id=${id}`);
  };

  return (
    <div className="home-container">
      <Swiper>
        {bannerImageList.map((url, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <img src={url} />
          </SwiperSlide>
        ))}
        {recommandList.map(({ id, picUrl, name }) => (
          <div
            key={id}
            className="recommand-item"
            onClick={() => handleClick(id)}
          >
            <LazyLoad>
              <img src={picUrl} alt="" />
            </LazyLoad>
            <div className="recommand-name">{name}</div>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
