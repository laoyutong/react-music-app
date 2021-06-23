import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";

import NavigationHeader from "@/components/NavigationHeader";
import TransitionRouter, {
  ITransitionRouterProps,
} from "@/components/TransitionRouter";

const RouterManagement = (): JSX.Element => {
  const history = useHistory();

  const [routerIndex, setRouterIndex] = useState<number>(0);

  const [transitionClass, setTransitionClass] =
    useState<ITransitionRouterProps["transitionClass"]>("forward");

  useEffect(() => {
    history.push("/home");
  }, []);

  const changeRouter = (path: string, index: number) => {
    if (routerIndex === index) return;
    history.push(path);
    setTransitionClass(index > routerIndex ? "forward" : "back");
    setRouterIndex(index);
  };

  return (
    <>
      <NavigationHeader changeRouter={changeRouter} routerIndex={routerIndex} />
      <TransitionRouter transitionClass={transitionClass} />
    </>
  );
};

export default (): JSX.Element => (
  <BrowserRouter>
    <RouterManagement />
  </BrowserRouter>
);
