import React, { useState, useEffect, useRef } from "react";
import "./index.less";
import { BrowserRouter, useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";
import { observer } from "@formily/reactive-react";

import NavigationHeader from "@/components/NavigationHeader";
import MusicPlayer from "@/components/MusicPlayer";
import TransitionRouter, {
  ITransitionRouterProps,
} from "@/components/TransitionRouter";
import store from "@/store";

import { routerWithHeader } from "@/router";

const NO_INDEX = -1 as const;

const RouterManagement = observer((): JSX.Element => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [routerIndex, setRouterIndex] = useState<number>(0);

  const prevIndex = useRef<number>(0);

  const [transitionClass, setTransitionClass] =
    useState<ITransitionRouterProps["transitionClass"]>("forward");

  useEffect(() => {
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

  return (
    <div
      className={classnames({
        "bottom-padding": !!store.musicPlaylist.length,
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

      {!!store.musicPlaylist.length && (
        <MusicPlayer
          musicPlaylist={store.musicPlaylist}
          musicPlayIndex={store.musicPlayIndex}
        />
      )}
    </div>
  );
});

export default (): JSX.Element => (
  <BrowserRouter>
    <RouterManagement />
  </BrowserRouter>
);
