import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { PersonView, SearchView } from "./Views";

import "./app.scss";
import { NotFound } from "./Components";

const App = (): JSX.Element => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("lbh-frontend").initAll();
    }
  }, []);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect
              to={"/search"}
            />
          </Route>
          <Route path="/search">
            <SearchView
              query={query.get("query")}
            />
          </Route>
          <Route path="/person/:id">
            <PersonView />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
