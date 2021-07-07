import React, { useEffect, useState } from "react";
import "./index.less";
import classnames from "classnames";
import LazyLoad from "react-lazyload";

import { alphabetList, singerCategoryTypes } from "@/config/singer";
import { getSingerListRequest } from "@/api/reuqest";
import type { ISingerListData } from "@/api/types";
import type { IRouterComponentProps } from "@/router";

const Singer = ({ changeRouter }: IRouterComponentProps): JSX.Element => {
  const [singerList, setSingerList] = useState<ISingerListData["artists"]>([]);

  const [activeAlphabet, setActiveAlphabet] = useState<string>(alphabetList[0]);

  const [activeCategory, setActiveCategory] = useState<{
    name: string;
    key: string;
  }>(singerCategoryTypes[0]);

  useEffect(() => {
    (async () => {
      const { artists } = await getSingerListRequest({
        category: activeCategory.key,
        alpha: activeAlphabet,
      });
      setSingerList(artists);
    })();
  }, [activeCategory, activeAlphabet]);

  const handleClick = (id: number) => {
    changeRouter(`/singerDetail?id=${id}`);
  };

  return (
    <div className="singer-container">
      <div className="singer-filter-type">
        <div className="singer-filter-title">首字母：</div>
        {alphabetList.map((alphabet) => (
          <div
            onClick={() => setActiveAlphabet(alphabet)}
            key={alphabet}
            className={classnames("singer-filter-item", {
              active: activeAlphabet === alphabet,
            })}
          >
            {alphabet}
          </div>
        ))}
      </div>
      <div className="singer-filter-type">
        <div className="singer-filter-title">种类：</div>
        {singerCategoryTypes.map((category) => (
          <div
            onClick={() => setActiveCategory(category)}
            key={category.key}
            className={classnames("singer-filter-item", {
              active: activeCategory.key === category.key,
            })}
          >
            {category.name}
          </div>
        ))}
      </div>
      {singerList.map(({ id, picUrl, name }) => (
        <div
          className="singer-list-item"
          key={id}
          onClick={() => handleClick(id)}
        >
          <LazyLoad>
            <img src={picUrl} alt="" />
          </LazyLoad>
          <div className="singer-name">{name}</div>
        </div>
      ))}
    </div>
  );
};

export default Singer;
