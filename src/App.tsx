import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import "./scss/app.scss";
import "./scss/batch-card.scss";
import { Provider } from "react-redux";
import { store } from "./Store";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginPage } from "./views/LoginPage/LoginPage";
import HomePage from "./views/HomePage/HomePage";
import { AdminPage } from "./views/AdminPage/AdminPage";
import { BatchInformationPage } from "./views/BatchInformationPage/BatchInformationPage";
import RouterGuard from "./components/RouterGuard/RouterGuard";
import { PageNotFound } from "./views/PageNotFound/PageNotFound";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/login" />} />
            <Route path="/login" component={LoginPage} />
            {/* <Route path="/home" component={HomePage} /> */}
            <RouterGuard component={HomePage} path="/home" redirectPath="/" role={["client"]} />
            {/* <Route path="/admin" component={AdminPage}/> */}
            <Route path="/batch" component={BatchInformationPage} />
            <Route path="/login-admin" />
            <RouterGuard component={AdminPage} path="/admin" redirectPath="/" role={["admin"]} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
