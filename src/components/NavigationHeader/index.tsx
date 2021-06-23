import React, { useEffect, useRef } from "react";
import "./index.less";
import classnames from "classnames";
import { Search } from "@icon-park/react";

import {
  navigationHeaderConfig,
  classListConfig,
  transformDisConfig,
} from "./config";

interface INavigationHeaderProps {
  changeRouter: (path: string, index: number) => void;
  routerIndex: number;
}

const NavigationHeader = ({
  changeRouter,
  routerIndex,
}: INavigationHeaderProps) => {
  const classConfigIndex = classListConfig[routerIndex];

  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (underlineRef.current) {
      underlineRef.current.style.transform = `translate3d(${transformDisConfig[classConfigIndex]}px,0,0)`;
    }
  }, [classConfigIndex]);

  return (
    <div className="navigation-header-container">
      {navigationHeaderConfig.map((config, index) => {
        const { label, path } = config;
        const classListItem = classListConfig[index];
        return (
          <div
            key={label}
            onClick={() => {
              changeRouter(path, index);
            }}
            className={classnames("navigation-item", classListItem, {
              "active-label": index === routerIndex,
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
