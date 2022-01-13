import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import RouterLoading from "../components/RouterLoading";

const AppViews = () => (
  <Suspense fallback={<RouterLoading />}>
    <Switch>
      <Route path="/" component={lazy(() => import("./home"))} exact={true} />
      <Route path="/auth" component={lazy(() => import("./auth"))} />
      <Route path="/course" component={lazy(() => import("./course"))} />
      <Route path="/package" component={lazy(() => import("./package"))} />
      <Route path="/event" component={lazy(() => import("./event"))} />
      <Route path="/blog" component={lazy(() => import("./blog"))} />
      <Route
          path={`/ActivateAccount`}
          component={lazy(() => import('./auth/ActivateAccount'))}
        />

      <Route
        path="/certificate"
        component={lazy(() => import("./certificate"))}
      />
      <Route path="/resource" component={lazy(() => import("./resource"))} />
      <Route path="/order" component={lazy(() => import("./order"))} />
      <Route path="/dashboard" component={lazy(() => import("./dashboard"))} />
      <Route path="/styles" component={lazy(() => import("./other/Styles"))} />
      <Route path="/term" component={lazy(() => import("./other/term"))} />
      <Route path="*" component={lazy(() => import("./other/NotFound"))} />
    </Switch>
  </Suspense>
);

export default AppViews;
