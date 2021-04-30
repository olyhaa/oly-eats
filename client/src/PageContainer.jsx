import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  ADD_RECIPE_PAGE,
  ADMIN_PAGE,
  HOME_PAGE,
  RECIPE_DETAIL_PAGE,
  EDIT_RECIPE_PAGE,
} from 'utils/PageConstants';
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
          <Redirect to={HOME_PAGE} />
        </Route>
        <Route path={ADMIN_PAGE}>
          <AdminHome />
        </Route>
        <Route path={`${RECIPE_DETAIL_PAGE}/:id`}>
          <RecipeDetail />
        </Route>
        <Route path={ADD_RECIPE_PAGE}>
          <AddRecipe />
        </Route>
        <Route path={`${EDIT_RECIPE_PAGE}/:id`}>
          <EditRecipe />
        </Route>
        <Route path={HOME_PAGE}>
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
