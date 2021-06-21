import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Search } from "@icon-park/react";

const navigationHeaderConfig = [
  { label: "首页", path: "/home" },
  { label: "排行", path: "/rank" },
  { label: "歌手", path: "/singer" },
];

const classListConfig = ["first", "middle", "last"] as const;

const transformDisConfig = {
  first: -82,
  middle: 0,
  last: 74,
};

const NavigationHeader = () => {
  const history = useHistory();

  const underlineRef = useRef<HTMLDivElement>(null);

  const activeRouter = history.location.pathname;

  const [classIndex, setClassIndex] =
    useState<keyof typeof transformDisConfig>("first");

  useEffect(() => {
    if (underlineRef.current) {
      underlineRef.current.style.transform = `translateX(${transformDisConfig[classIndex]}px)`;
    }
  }, [classIndex]);

  return (
    <div className="navigation-header-container">
      {navigationHeaderConfig.map((config, index) => {
        const { label, path } = config;
        const classListIndex = classListConfig[index];
        return (
          <div
            key={label}
            onClick={() => {
              history.push(path);
              setClassIndex(classListIndex);
            }}
            className={classnames("navigation-item", classListIndex, {
              "active-label": activeRouter === path,
            })}
          >
            {label}
          </div>
        );
      })}
      <Search className="search-logo" theme="outline" size="20" fill="#333" />
      <div className="active-underline" ref={underlineRef} />
    </div>
  );
};

export default NavigationHeader;
