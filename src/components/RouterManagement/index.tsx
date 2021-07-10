import React, { useState, useEffect, useRef } from "react";
import "./index.less";
import { BrowserRouter, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import classnames from "classnames";

import NavigationHeader from "@/components/NavigationHeader";
import MusicPlayer from "@/components/MusicPlayer";
import TransitionRouter, {
  ITransitionRouterProps,
} from "@/components/TransitionRouter";

import { routerWithHeader } from "@/router";
import type { StoreState } from "@/store/types";

const NO_INDEX = -1 as const;

const RouterManagement = (): JSX.Element => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [routerIndex, setRouterIndex] = useState<number>(0);

  const prevIndex = useRef<number>(0);

  const [transitionClass, setTransitionClass] =
    useState<ITransitionRouterProps["transitionClass"]>("forward");

  useEffect(() => {
    // history.push("/singerDetail?id=12127564");
    history.push("/home");
  }, []);

  const changeRouter = (path: string, index: number = NO_INDEX) => {
    history.push(path);
    setRouterIndex(index);

    if (routerIndex !== index) {
      setTransitionClass(
        index === NO_INDEX || index > routerIndex ? "forward" : "back"
      );
      if (index !== NO_INDEX) {
        prevIndex.current = index;
      }
    }
  };

  const onRouterBack = () => {
    history.goBack();
    setRouterIndex(prevIndex.current);
    setTransitionClass("back");
  };

  const { musicPlaylist, musicPlayIndex } = useSelector<StoreState, StoreState>(
    (state) => state
  );

  return (
    <div
      className={classnames({
        "bottom-padding": !!musicPlaylist.length,
      })}
    >
      {routerWithHeader.includes(pathname) && (
        <NavigationHeader
          changeRouter={changeRouter}
          routerIndex={routerIndex}
        />
      )}
      <TransitionRouter
        changeRouter={changeRouter}
        onRouterBack={onRouterBack}
        transitionClass={transitionClass}
      />

      {!!musicPlaylist.length && (
        <MusicPlayer
          musicPlaylist={musicPlaylist}
          musicPlayIndex={musicPlayIndex}
        />
      )}
    </div>
  );
};

export default (): JSX.Element => (
  <BrowserRouter>
    <RouterManagement />
  </BrowserRouter>
);
