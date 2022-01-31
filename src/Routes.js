import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './components/layouts/MainLayout'
import AttendanceCheck from './components/pages/AttendanceCheck'

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route
          path='/'
          exact
          render={props => (
            <MainLayout
              ContentBody={
                <AttendanceCheck
                  {...props}
                />
              }
            />
          )}
        />
      </Switch>
    </Router>
  )
};
      
      // {isMobile() ? routesList.map(({ path, component: Component }, index) => (
      //   <Route
      //     key={index}
      //     path={path}
      //     exact
      //     render={props => (
      //       <Component {...props} />
      //     )}
      //   />
      // ))}

export default Routes;
