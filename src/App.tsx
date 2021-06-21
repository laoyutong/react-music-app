import React from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import routerConfig, { IRouterConfig } from "./router";

const renderRouter = (routerConfig: IRouterConfig): JSX.Element => {
  return (
    <BrowserRouter>
      {routerConfig.map(({ path, component, redirect }) => {
        if (redirect) {
          return <Redirect key={path} path={path} to={redirect} />;
        }
        return <Route key={path} path={path} component={component} />;
      })}
    </BrowserRouter>
  );
};

function App() {
  return renderRouter(routerConfig);
}

export default App;
