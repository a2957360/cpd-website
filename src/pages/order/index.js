import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import RouterLoading from "../../components/RouterLoading";

//event router
const Order = ({ match }) => {
  return (
    <Suspense fallback={<RouterLoading />}>
      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/cart`} />
        <Route path={`${match.url}/cart`} component={lazy(() => import("./cart"))} />
        <Route path={`${match.url}/checkout`} component={lazy(() => import("./checkout"))} />
        <Route path={`${match.url}/credit`} component={lazy(() => import("./credit"))} />
        <Route path={`${match.url}/congratulations`} component={lazy(() => import("../other/Congratulations"))} />
      </Switch>
    </Suspense>
  )
}

export default Order;

