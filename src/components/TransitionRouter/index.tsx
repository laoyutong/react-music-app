import React, { cloneElement } from "react";
import "./index.less";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";

import routerConfig, { IRouterConfig } from "@/router";

const renderRouter = (routerConfig: IRouterConfig): JSX.Element[] =>
  routerConfig.map(({ path, component }) => (
    <Route key={path} path={path} component={component} />
  ));

export interface ITransitionRouterProps {
  transitionClass: "forward" | "back";
}

const TransitionRouter = ({
  transitionClass,
}: ITransitionRouterProps): JSX.Element => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <TransitionGroup
      childFactory={(child) =>
        cloneElement(child, {
          classNames: transitionClass,
        })
      }
    >
      <CSSTransition key={pathname} timeout={500}>
        <Switch location={location}>{renderRouter(routerConfig)}</Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionRouter;
