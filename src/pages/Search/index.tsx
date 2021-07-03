import React, { useEffect, useState } from "react";
import "./index.less";
import { Search as SearchLogo, CloseOne } from "@icon-park/react";

import BackHeader from "@/components/BackHeader";
import type { IRouterComponentProps } from "@/router";
import { getSearchHotList } from "@/api/reuqest";
import type { ISearchHotListData } from "@/api/types";

const Search = ({ onRouterBack }: IRouterComponentProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");

  const clearSearchValue = () => {
    setSearchValue("");
  };

  const [searchHotList, setSearchHotList] = useState<
    ISearchHotListData["result"]["hots"]
  >([]);

  const searchHotValueList = searchHotList.map((item) => item.first);

  useEffect(() => {
    (async () => {
      const {
        result: { hots },
      } = await getSearchHotList();
      setSearchHotList(hots);
    })();
  }, []);

  return (
    <div className="search-container">
      <BackHeader onBack={onRouterBack} title="搜索页面" />
      <div className="search-input-area">
        <SearchLogo theme="outline" size="20" fill="#333" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="请输入搜索关键词"
        />
        {!!searchValue && (
          <CloseOne
            onClick={clearSearchValue}
            theme="outline"
            size="16"
            fill="#333"
            className="clear-input-logo"
          />
        )}
      </div>
      <div className="search-show-list">
        <div className="searc-show-title">热门搜索</div>
        <div className="search-show-items">
          {searchHotValueList.map((value) => (
            <div
              className="search-show-item"
              key={value}
              onClick={() => setSearchValue(value)}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
