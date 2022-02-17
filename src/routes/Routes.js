import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import SampleLayout from "../components/layouts/SampleLayout/SampleLayout";
import Admin from "../components/pages/Admin/Admin";
import Main from "../components/pages/Main/Main";
import SampleView from "../components/pages/SampleView/SampleView";

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route
          exact
          path="/sample"
          render={(props) => (
            <SampleLayout>
              <SampleView {...props} />
            </SampleLayout>
          )}
        />
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
