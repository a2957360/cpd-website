import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import RouterLoading from "../../components/RouterLoading";

//course router
const Course = ({ match }) => {
  return (
    <Suspense fallback={<RouterLoading />}>
      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
        <Route
          path={`${match.url}/list`}
          component={lazy(() => import("./list"))}
        />
        <Route
          path={`${match.url}/detail/:id`}
          component={lazy(() => import("./detail"))}
        />
        <Route
          path={`${match.url}/detail-dashboard/:id`}
          component={lazy(() => import("./detail-dashboard"))}
        />
        <Route
          path={`${match.url}/instructor/:id`}
          component={lazy(() => import("./instructor"))}
        />
        <Route
          path={`${match.url}/detail-mypackage/:id`}
          component={lazy(() => import("./detail-mypackage"))}
        />
      </Switch>
    </Suspense>
  );
};

export default Course;
