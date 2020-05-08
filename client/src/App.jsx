import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: green,
      secondary: orange,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Switch>
          <Route path="/recipe/:id">
            <RecipeDetail />
          </Route>
          <Route path="/addRecipe">
            <AddRecipe />
          </Route>
          <Route path="/editRecipe/:id">
            <EditRecipe />
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