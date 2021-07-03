import React, { cloneElement } from "react";
import "./index.less";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";

import routerConfig, { IRouterConfig, IRouterComponentProps } from "@/router";

const renderRouter = (
  routerConfig: IRouterConfig,
  props: IRouterComponentProps
): JSX.Element[] =>
  routerConfig.map(({ path, component: Component }) => (
    <Route key={path} path={path} render={() => <Component {...props} />} />
  ));

export interface ITransitionRouterProps {
  transitionClass: "forward" | "back";
  changeRouter: (path: string, index?: number) => void;
  onRouterBack: () => void;
}

const TransitionRouter = ({
  transitionClass,
  changeRouter,
  onRouterBack,
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
      <CSSTransition key={pathname} timeout={300}>
        <Switch location={location}>
          {renderRouter(routerConfig, { changeRouter, onRouterBack })}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionRouter;
