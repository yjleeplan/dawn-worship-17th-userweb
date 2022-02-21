import { ConfigProvider } from "antd";
import koKR from "antd/lib/locale/ko_KR";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/css/index.css";
import Routes from "./routes/Routes";
import { persistor, store } from "./stores";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={koKR}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
