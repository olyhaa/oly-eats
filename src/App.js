import React from 'react';
import { Link } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import AddRecipe from './pages/AddRecipe';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: 'auto',
    position: 'fixed'
  }
}));

function App() {
  const classes = useStyles();
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
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
          <Route path="/addRecipe">
            <AddRecipe />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Fab color="primary" className={classes.fab} component={Link} to="/addRecipe">
          <AddIcon />
        </Fab>
      </Router>
    </ThemeProvider>
  );
}

export default App;
