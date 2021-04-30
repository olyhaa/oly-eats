import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';
import AdminHome from './pages/AdminHome';
import ErrorPage from './pages/ErrorPage';
import PageLayout from './components/PageLayout';

const PageContainer = () => {
  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default PageContainer;
