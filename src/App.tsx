import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import routerConfig, { IRouterConfig } from "./router";

import NavigationHeader from "./components/NavigationHeader";

const renderRouter = (routerConfig: IRouterConfig): JSX.Element[] => {
  return routerConfig.map((routerItem, index) => {
    const { path } = routerItem;
    if ("component" in routerItem) {
      return <Route key={index} path={path} component={routerItem.component} />;
    }
    return <Redirect key={index} path={path} to={routerItem.redirect} />;
  });
};

function App() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <NavigationHeader />
        {renderRouter(routerConfig)}
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
