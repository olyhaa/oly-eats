import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: green,
      secondary: orange
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
