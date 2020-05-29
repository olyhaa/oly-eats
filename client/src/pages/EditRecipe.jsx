import React from 'react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/react-hooks';
import { getRecipeQuery, removeNulls } from 'utils/FetchData';
import { useParams } from 'react-router-dom';
import { decodeRecipe } from 'components/add/utils/decodeRecipe';
import { FIELDS } from 'components/add/constants/formConstants';
import store from '../components/add/store/store';
import Header from '../components/Header';
import AddRecipeForm from '../components/add/AddRecipeForm';

function EditRecipe() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(getRecipeQuery(), {
    variables: { id },
  });

  // TODO
  if (loading) {
    return <span>Loading!</span>;
  }
  if (error) {
    return <span>Error!</span>;
  }

  const { recipe } = removeNulls(data);
  const initialValues = decodeRecipe(recipe);

  return (
    <>
      <Header title={`Edit Recipe: ${initialValues[FIELDS.TITLE]}`} />
      <Provider store={store}>
        <Grid container justify="center">
          <AddRecipeForm initialValues={initialValues} isEdit />
        </Grid>
      </Provider>
    </>
  );
}

export default EditRecipe;
