import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RouterLoading from '../../components/RouterLoading';

//resource router
const Resource = ({ match }) => {
  return (
    <Suspense fallback={<RouterLoading />}>
      <Switch>
        <Redirect exact from={`${match.url}`} to={'/'} />
        <Route
          path={`${match.url}/become-an-instructor`}
          exact
          component={lazy(() => import('./Instructor'))}
        />
        <Route
          path={`${match.url}/become-an-instructor/application`}
          exact
          component={lazy(() => import('./InstructorApplication'))}
        />
        <Route
          path={`${match.url}/blog/detail/about-us?id=6`}
          component={lazy(() => import('./About'))}
        />
        <Route
          path={`${match.url}/contact-us`}
          component={lazy(() => import('./Contact'))}
        />
        <Route
          path={`${match.url}/help-and-support`}
          component={lazy(() => import('./Support'))}
        />
        <Route
          path={`${match.url}/tutorial`}
          component={lazy(() => import('./Tutorial'))}
        />
        <Route
          path={`${match.url}/policy`}
          component={lazy(() => import('./Policy'))}
        />
        <Route
          path={`${match.url}/terms-and-conditions`}
          component={lazy(() => import('./Terms'))}
        />
        <Route
          path={`${match.url}/congratulations`}
          component={lazy(() => import('../other/Congratulations'))}
        />
        {/* <Route path="*" component={lazy(() => import('../../pages/other/NotFound'))} /> */}
      </Switch>
    </Suspense>
  );
};

export default Resource;
