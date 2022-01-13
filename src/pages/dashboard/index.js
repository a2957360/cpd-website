import React, { useState, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
//components
import RouterLoading from '../../components/RouterLoading';
import MobileFloatMenu from './MobileFloatMenu';

const UserDashboard = ({ match }) => {
  return (
    <Suspense fallback={<RouterLoading />}>
      {/* <MobileFloatMenu /> */}

      <Switch>
        <Route
          path={`${match.url}/courses`}
          component={lazy(() => import('./MyCourse'))}
        />
        <Route
          path={`${match.url}/packages`}
          component={lazy(() => import('./MyPackages'))}
        />
        <Route
          path={`${match.url}/certificates`}
          component={lazy(() => import('./MyCertificates'))}
        />
        <Route
          path={`${match.url}/bookmarks`}
          component={lazy(() => import('./MyBookmarks'))}
        />
        <Route
          path={`${match.url}/reviews`}
          component={lazy(() => import('./MyReviews'))}
        />
        <Route
          path={`${match.url}/events`}
          component={lazy(() => import('./MyRegisterEvent'))}
        />
        <Route
          path={`${match.url}/recentviews`}
          component={lazy(() => import('./MyRecentView'))}
        />
        <Route
          path={`${match.url}/orders`}
          component={lazy(() => import('./MyOrders'))}
        />
        <Route
          path={`${match.url}/profile`}
          component={lazy(() => import('./Profile'))}
        />
        <Route
          path={`${match.url}/security`}
          component={lazy(() => import('./Security'))}
        />
        <Route
          path={`${match.url}/transactions`}
          component={lazy(() => import('./MyTransactions'))}
        />
        {/* <Route path={`${match.url}/activate-account`} component={lazy(() => import('./ActivateAccount'))} /> */}
        <Route path='*' component={lazy(() => import('./MainContent'))} />
      </Switch>
    </Suspense>
  );
};

export default UserDashboard;
