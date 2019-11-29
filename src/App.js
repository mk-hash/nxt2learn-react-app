import React from "react";
import "./App.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Home from "./components/Home";
import Topics from "./components/Topics";
import Report from "./components/Report";

import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Link to="/" className="Link">
              <Typography variant="h6" color="inherit">
                nxt2learn
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/c/:id/report">
            <Report></Report>
          </Route>

          <Route path="/c/:id">
            <Topics></Topics>
          </Route>

          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
