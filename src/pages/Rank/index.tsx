import React, { useEffect, useState } from "react";
import "./index.less";
import LazyLoad from "react-lazyload";

import toplistDetailApi, { RankListData } from "@/api/toplistDetail";
import type { IRouterComponentProps } from "@/router";

const Rank = ({ changeRouter }: IRouterComponentProps): JSX.Element => {
  const [rankList, setRankList] = useState<RankListData["list"]>([]);

  useEffect(() => {
    (async () => {
      const { list } = await toplistDetailApi();
      setRankList(list);
    })();
  }, []);

  const handleClick = (id: number) => {
    changeRouter(`/albumDetail?id=${id}`);
  };

  return (
    <div className="rank-container">
      {rankList.map(({ coverImgUrl, id, name, description }) => (
        <div className="rank-item" key={id} onClick={() => handleClick(id)}>
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
