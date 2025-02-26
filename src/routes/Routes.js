import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import RankLayout from "../components/layouts/RankLayout/RankLayout";
import RankMobileLayout from "../components/layouts/RankMobileLayout/RankMobileLayout";
import Admin from "../components/pages/Admin/Admin";
import AdminSetting from "../components/pages/Admin/AdminSetting";
import Main from "../components/pages/Main/Main";
import Rank from "../components/pages/Rank/Rank";
import RankMobile from "../components/pages/RankMobile/RankMobile";

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
            <MainLayout isAdmin={true} buttonType="home">
              <Admin {...props} />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/admin/setting"
          render={(props) => (
            <MainLayout isAdmin={true} buttonType="setting">
              <AdminSetting {...props} />
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
          render={(props) =>
            isMobile() ? (
              <RankMobileLayout>
                <RankMobile {...props} />
              </RankMobileLayout>
            ) : (
              <RankLayout>
                <Rank {...props} isMobile={isMobile} />
              </RankLayout>
            )
          }
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
