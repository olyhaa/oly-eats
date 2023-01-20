import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { useQuery } from '@apollo/client';
import { getRecipeQuery, removeNulls } from 'utils/FetchData';
import { ERROR_PAGE } from 'utils/PageConstants';
import { decodeRecipe } from 'components/add/utils/decodeRecipe';
import store from '../components/add/store/store';
import AddRecipeForm from '../components/add/AddRecipeForm';

const useStyles = makeStyles((theme) => ({
  skeletonItem: {
    margin: theme.spacing(1),
    height: '80px',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2),
    },
  },
}));

const EditRecipe = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, error, loading } = useQuery(getRecipeQuery(), {
    variables: { id },
  });

  if (error) {
    return <Redirect to={ERROR_PAGE} />;
  }

  const { recipe } = removeNulls(data);
  const initialValues = recipe ? decodeRecipe(recipe) : {};

  return (
    <Provider store={store}>
      <Grid container justify="center">
        {loading ? (
          <>
            {Array.from(new Array(6)).map(() => (
              <Grid item xs={12} className={classes.skeletonItem}>
                <Skeleton variant="rect" height="100%" width="100%" />
              </Grid>
            ))}
          </>
        ) : (
          <AddRecipeForm initialValues={initialValues} isEdit />
        )}
      </Grid>
    </Provider>
  );
};

export default EditRecipe;
