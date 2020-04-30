import React from 'react';
import { Provider } from 'react-redux';
import { FIELDS } from 'components/add/formConstants';
import Grid from '@material-ui/core/Grid';
import store from '../components/add/store/store';
import Header from '../components/Header';
import AddRecipeForm from '../components/add/AddRecipeForm';

function AddRecipe() {
  const initialValues = {};
  initialValues[FIELDS.INGREDIENTS] = [{}];
  initialValues[FIELDS.DIRECTIONS] = [{}];
  return (
    <>
      <Header title="New Recipe" />
      <Provider store={store}>
        <Grid container justify="center">
          <AddRecipeForm initialValues={initialValues} />
        </Grid>
      </Provider>
    </>
  );
}

export default AddRecipe;
