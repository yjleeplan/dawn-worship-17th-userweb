import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import RankLayout from "../components/layouts/RankLayout/RankLayout";
import Admin from "../components/pages/Admin/Admin";
import Main from "../components/pages/Main/Main";
import Rank from "../components/pages/Rank/Rank";

const Routes = () => {
  // 접속 기기 체크
  const isMobile = () => {
    const pc = "win16|win32|win64|mac|macintel";
    if (navigator.platform) {
      if (pc.indexOf(navigator.platform.toLowerCase()) < 0) return true;
      else return false;
    } else return true;
  };

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route
          exact
          path="/admin"
          render={(props) => (
            <MainLayout isAdmin={true}>
              <Admin {...props} />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/main"
          render={(props) => (
            <MainLayout>
              <Main {...props} />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/rank"
          render={(props) => (
            <RankLayout>
              <Rank {...props} isMobile={isMobile} />
            </RankLayout>
          )}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <MainLayout>
              <Main {...props} />
            </MainLayout>
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
