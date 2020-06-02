import React from 'react';
import { Provider } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { getRecipeQuery, removeNulls } from 'utils/FetchData';
import { useParams } from 'react-router-dom';
import { decodeRecipe } from 'components/add/utils/decodeRecipe';
import store from '../components/add/store/store';
import Header from '../components/Header';
import AddRecipeForm from '../components/add/AddRecipeForm';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    margin: theme.spacing(3),
  },
  loading: {
    margin: 'auto',
  },
}));

function EditRecipe() {
  const classes = useStyles();
  const { id } = useParams();
  const { data, error, loading } = useQuery(getRecipeQuery(), {
    variables: { id },
  });

  // TODO
  if (error) {
    return <span>Error!</span>;
  }

  const { recipe } = removeNulls(data);
  const initialValues = recipe ? decodeRecipe(recipe) : {};

  return (
    <>
      <Header title="Edit Recipe" />
      {loading && (
        <div className={classes.loadingContainer}>
          <CircularProgress className={classes.loading} />
        </div>
      )}
      {!loading && (
        <Provider store={store}>
          <Grid container justify="center" className={classes.root}>
            <AddRecipeForm initialValues={initialValues} isEdit />
          </Grid>
        </Provider>
      )}
    </>
  );
}

export default EditRecipe;
