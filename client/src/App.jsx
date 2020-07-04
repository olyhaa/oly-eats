import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import history from './store/history';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';
import AdminHome from './pages/AdminHome';
import ErrorPage from './pages/ErrorPage';
import ErrorBoundary from 'components/error/ErrorBoundary';

function App() {
  const darkTheme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 500,
        md: 820,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      type: 'dark',
      primary: green,
      secondary: orange,
    },
    overrides: {
      // Style sheet name
      // @ts-ignore
      MuiSpeedDial: {
        // Name of the rule
        fab: {
          // Some CSS
          position: 'fixed',
          right: '16px',
          bottom: '16px',
        },
        actions: {
          // Some CSS
          position: 'fixed',
          right: '16px',
          bottom: '60px',
        },
      },
      MuiTableRow: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
  });

  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/admin">
              <AdminHome />
            </Route>
            <Route path="/recipe/:id">
              <RecipeDetail />
            </Route>
            <Route path="/addRecipe">
              <AddRecipe />
            </Route>
            <Route path="/editRecipe/:id">
              <EditRecipe />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
