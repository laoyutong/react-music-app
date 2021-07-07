import React, { useEffect, useState } from "react";
import "./index.less";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import LazyLoad from "react-lazyload";

import { getBanner, getRecommandList } from "@/api/reuqest";
import type { IBannerData, IRecommandListData } from "@/api/types";
import type { IRouterComponentProps } from "@/router";

const Home = ({ changeRouter }: IRouterComponentProps): JSX.Element => {
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
