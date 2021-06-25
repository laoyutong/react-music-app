import React, { useEffect, useState } from "react";
import "./index.less";
import LazyLoad from "react-lazyload";

import { getRankList } from "@/api/reuqest";
import type { IRankListData } from "@/api/types";

const Rank = (): JSX.Element => {
  const [rankList, setRankList] = useState<IRankListData["list"]>([]);

  useEffect(() => {
    (async () => {
      const { list } = await getRankList();
      setRankList(list);
    })();
  }, []);

  return (
    <div className="rank-container">
      {rankList.map(({ coverImgUrl, id, name, description }) => (
        <div className="rank-item" key={id}>
          <LazyLoad>
            <img src={coverImgUrl} alt="" />
          </LazyLoad>
          <div className="rank-message">
            <div className="rank-name">{name}</div>
            <div className="rank-description">{description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rank;
