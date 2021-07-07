import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";

import NavigationHeader from "@/components/NavigationHeader";
import TransitionRouter, {
  ITransitionRouterProps,
} from "@/components/TransitionRouter";

const NO_INDEX = -1 as const;

const RouterManagement = (): JSX.Element => {
  const history = useHistory();

  const [routerIndex, setRouterIndex] = useState<number>(0);

  const prevIndex = useRef<number>(0);

  const [transitionClass, setTransitionClass] =
    useState<ITransitionRouterProps["transitionClass"]>("forward");

  useEffect(() => {
    history.push("/singerDetail?id=12174057");
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
    <>
      <NavigationHeader changeRouter={changeRouter} routerIndex={routerIndex} />
      <TransitionRouter
        changeRouter={changeRouter}
        onRouterBack={onRouterBack}
        transitionClass={transitionClass}
      />
    </>
  );
};

export default (): JSX.Element => (
  <BrowserRouter>
    <RouterManagement />
  </BrowserRouter>
);
