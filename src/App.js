import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';

// import firebase from "firebase";
// import { firebaseConfig } from "./configs/AppConfig";

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default function App() {

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
