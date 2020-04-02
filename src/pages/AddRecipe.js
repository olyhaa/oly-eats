import React from 'react';
import { Provider } from 'react-redux';
import store from '../components/add/store/store';
import Header from '../components/Header';
import AddRecipeForm from '../components/add/AddRecipeForm';

function AddRecipe() {
  return (
    <>
      <Header title="Add New Recipe" />
      <Provider store={store}>
        <AddRecipeForm />
      </Provider>
    </>
  );
}

export default AddRecipe;
