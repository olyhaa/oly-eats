import React from 'react';
import { Provider } from 'react-redux';
import { FIELDS } from 'components/add/constants';
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
        <AddRecipeForm initialValues={initialValues} />
      </Provider>
    </>
  );
}

export default AddRecipe;
