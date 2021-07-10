import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "@/store";

import RouterManagement from "@/components/RouterManagement";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RouterManagement />
    </Provider>
  );
}

export default App;
