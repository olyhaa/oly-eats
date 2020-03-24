import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Switch>
          <Route path="/recipe/:id">
            <RecipeDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
