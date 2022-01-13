import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RouterLoading from '../../components/RouterLoading';

//event router
const Event = ({ match }) => {
  return (
    <Suspense fallback={<RouterLoading />}>
      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
        <Route
          path={`${match.url}/list`}
          component={lazy(() => import('./list'))}
        />
        <Route
          path={`${match.url}/detail/:repo`}
          component={lazy(() => import('./detail'))}
        />
      </Switch>
    </Suspense>
  );
};

export default Event;
