import React, { useState, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
//components
import RouterLoading from '../../components/RouterLoading';

const Auth = ({ match }) => {
  return (
    <Suspense fallback={<RouterLoading />}>
      <Switch>
        {/* <Route
          path={`${match.url}/courses`}
          component={lazy(() => import("./MyCourse"))}
        />
        <Route
          path={`${match.url}/packages`}
          component={lazy(() => import("./MyPackages"))}
        />
        <Route
          path={`${match.url}/certificates`}
          component={lazy(() => import("./MyCertificates"))}
        />
        <Route
          path={`${match.url}/bookmarks`}
          component={lazy(() => import("./MyBookmarks"))}
        />
        <Route
          path={`${match.url}/reviews`}
          component={lazy(() => import("./MyReviews"))}
        />
        <Route
          path={`${match.url}/events`}
          component={lazy(() => import("./MyRegisterEvent"))}
        />
        <Route
          path={`${match.url}/recentviews`}
          component={lazy(() => import("./MyRecentView"))}
        />
        <Route
          path={`${match.url}/orders`}
          component={lazy(() => import("./MyOrders"))}
        />
        <Route
          path={`${match.url}/profile`}
          component={lazy(() => import("./Profile"))}
        />
        <Route
          path={`${match.url}/security`}
          component={lazy(() => import("./Security"))}
        /> */}
        <Route
          path={`${match.url}/activeAccount`}
          component={lazy(() => import('./ActivateAccount'))}
        />
        <Route
          path={`${match.url}/password-recovery`}
          component={lazy(() => import('./ResetPasswordEmailSent'))}
        />
        <Route
          path={`${match.url}/password-reset`}
          component={lazy(() => import('./ResetPassword'))}
        />
        <Route path='*' component={lazy(() => import('../other/NotFound'))} />
      </Switch>
    </Suspense>
  );
};

export default Auth;
