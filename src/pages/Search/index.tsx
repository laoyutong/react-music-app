import React, { useEffect, useState } from "react";
import "./index.less";
import { Search as SearchLogo, CloseOne } from "@icon-park/react";

import BackHeader from "@/components/BackHeader";
import type { IRouterComponentProps } from "@/router";

import searchApi, { SearchSongsData } from "@/api/search";
import searchSuggestApi, { SearchSingersData } from "@/api/searchSuggest";
import searchHotApi, { SearchHotListData } from "@/api/searchHot";
import { useDebounce, useImmer } from "@/hooks";
import { HISTORY_SEARCH_KEY } from "@/config";

const Search = ({ onRouterBack }: IRouterComponentProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue);

  const clearSearchValue = () => {
    setSearchValue("");
    setSearchSingers([]);
    setSearchSongs([]);
  };

  const [searchSingers, setSearchSingers] = useState<
    SearchSingersData["result"]["artists"]
  >([]);

  const [searchSongs, setSearchSongs] = useState<
    SearchSongsData["result"]["songs"]
  >([]);

  const isShowSearchResult =
    !!searchValue.trim() &&
    (searchSingers.length !== 0 || searchSongs.length !== 0);

  useEffect(() => {
    (async () => {
      if (!debouncedSearchValue.trim()) return;
      const {
        result: { songs },
      } = await searchApi(debouncedSearchValue);
      setSearchSongs(songs || []);
    })();

    (async () => {
      if (!debouncedSearchValue.trim()) return;
      const {
        result: { artists },
      } = await searchSuggestApi(debouncedSearchValue);
      setSearchSingers(artists || []);
    })();
  }, [debouncedSearchValue]);

  const [searchHotList, setSearchHotList] = useState<
    SearchHotListData["result"]["hots"]
  >([]);

  const searchHotValueList = searchHotList.map((item) => item.first);

  useEffect(() => {
    (async () => {
      const {
        result: { hots },
      } = await searchHotApi();
      setSearchHotList(hots);
    })();
  }, []);

  const [searchHistoryList, setSearchHistoryList] = useImmer<string[]>([]);

  useEffect(() => {
    setSearchHistoryList(
      JSON.parse(localStorage.getItem(HISTORY_SEARCH_KEY) || "[]")
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_SEARCH_KEY, JSON.stringify(searchHistoryList));
  }, [searchHistoryList]);

  const addHistoryList = (value: string) => {
    setSearchHistoryList((draft) => {
      const index = draft.indexOf(value);
      if (index !== -1) {
        draft.splice(index, 1);
      }
      if (draft.length >= 10) {
        draft.pop();
      }
      draft.unshift(value);
    });
  };

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
        {!!searchValue.trim() && (
          <CloseOne
            onClick={clearSearchValue}
            theme="outline"
            size="16"
            fill="#333"
            className="clear-input-logo"
          />
        )}
      </div>

      {!isShowSearchResult && (
        <>
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

          {!!searchHistoryList.length && (
            <div className="search-show-list">
              <div className="searc-show-title">历史搜索</div>
              <div className="search-show-items">
                {searchHistoryList.map((value) => (
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
          )}
        </>
      )}
      {isShowSearchResult && (
        <div className="search-content">
          {searchSingers.map(({ id, name, picUrl }) => (
            <div
              className="search-singer-item"
              key={id}
              onClick={() => addHistoryList(name)}
            >
              <img src={picUrl} alt="" />
              <div className="search-singer-name">{name}</div>
            </div>
          ))}
          {searchSongs.map(({ id, name }) => (
            <div
              className="search-song-item"
              key={id}
              onClick={() => addHistoryList(name)}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
