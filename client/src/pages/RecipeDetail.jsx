import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams } from 'react-router-dom';
import compose from 'lodash.flowright';
import { graphql } from '@apollo/client/react/hoc';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  getRecipeQuery,
  removeNulls,
  getDeleteRecipeMutation,
} from 'utils/FetchData';
import { useQuery } from '@apollo/client';
import { RECIPE } from 'utils/recipeConstants';
import { EDIT_RECIPE_PAGE, ERROR_PAGE, HOME_PAGE } from 'utils/PageConstants';
import ActionGroup from 'components/add/ActionGroup';
import DeleteModal from 'components/DeleteModal';
import Ingredients from '../components/recipe/Ingredients';
import Directions from '../components/recipe/Directions';
import Overview from '../components/recipe/Overview';
import history from '../store/history';
import Image from '../components/recipe/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
    },
  },
  loading: {
    margin: 'auto',
  },
  missingRecipe: {
    textAlign: 'center',
    margin: theme.spacing(5),
  },
  carrot: {
    width: '200px',
  },
  carrotText: {
    color: '#DD7017',
    fontSize: '2rem',
  },
  mainContent: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  outerGrid: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-end',
  },
}));

const RecipeDetail = ({ deleteMutation }) => {
  const UNMODIFIED = -1;
  const classes = useStyles();
  const { id } = useParams();
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { data, error, loading } = useQuery(getRecipeQuery(), {
    variables: { id },
  });
  const [modalOpenState, setModalOpen] = useState(false);
  const [recipeServings, setRecipeServings] = useState(UNMODIFIED);

  if (error) {
    return <Redirect to={ERROR_PAGE} />;
  }

  const { recipe } = removeNulls(data);
  const recipeTitle = recipe ? recipe[RECIPE.TITLE] : '';

  const handleEditOption = () => {
    history.push(`${EDIT_RECIPE_PAGE}/${id}`);
  };

  const handleDeleteOption = () => {
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteMutation({
      variables: { id },
      refetchQueries: ['GetAllRecipes', 'GetRecipe'],
    }).then((result) => {
      if (result?.data?.deleteRecipe?.success) {
        setModalOpen(false);
        history.push(HOME_PAGE);
      }
    });
  };

  const updateServings = (newValue) => {
    setRecipeServings(newValue);
  };

  const handleDeleteCancel = () => {
    setModalOpen(false);
  };

  if (!loading && !recipe) {
    return <Redirect to={ERROR_PAGE} />;
  }

  return (
    <>
      <div className={classes.mainContent}>
        <div className={classes.root}>
          <Grid
            container
            spacing={2}
            alignItems="stretch"
            direction={isSmallerScreen ? 'column' : 'row'}
          >
            {loading ? (
              <Grid className={classes.outerGrid} item lg={6} md={12} sm={12}>
                <Skeleton variant="rect" width="100%" height={500} />
              </Grid>
            ) : (
              recipe[RECIPE.PHOTO] && (
                <Grid className={classes.outerGrid} item lg={6} md={12} sm={12}>
                  <Image
                    title={recipe[RECIPE.TITLE]}
                    imageSrc={recipe[RECIPE.PHOTO]}
                  />
                </Grid>
              )
            )}
            {loading ? (
              <Grid className={classes.outerGrid} item md={12} sm={12}>
                <Grid container spacing={isSmallerScreen ? 1 : 2}>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" width="100%" height={150} />
                  </Grid>
                  <Grid item xs>
                    <Skeleton variant="rect" width="100%" height={170} />
                  </Grid>
                  <Grid item xs>
                    <Skeleton variant="rect" width="100%" height={170} />
                  </Grid>
                  <Grid item xs>
                    <Skeleton variant="rect" width="100%" height={170} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" width="100%" height={150} />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid
                className={classes.outerGrid}
                item
                lg={recipe[RECIPE.PHOTO] ? 6 : 12}
                md={12}
                sm={12}
              >
                <Overview
                  description={recipe[RECIPE.DESCRIPTION]}
                  prepTime={recipe[RECIPE.TIMING][RECIPE.TIMING_PREP]}
                  totalTime={recipe[RECIPE.TIMING][RECIPE.TIMING_TOTAL]}
                  servings={
                    recipeServings === UNMODIFIED
                      ? recipe[RECIPE.SERVINGS]
                      : recipeServings
                  }
                  updateServingSize={updateServings}
                  source={recipe[RECIPE.SOURCE]}
                  dateAdded={recipe[RECIPE.META][RECIPE.DATE_ADDED]}
                />
              </Grid>
            )}
          </Grid>
        </div>

        <div className={classes.root}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={4}>
              {loading ? (
                <Skeleton variant="rect" width="100%" height={500} />
              ) : (
                <Ingredients
                  ingredientList={recipe[RECIPE.INGREDIENT_SECTION]}
                  recipeScale={
                    recipeServings === UNMODIFIED
                      ? undefined
                      : recipeServings / recipe[RECIPE.SERVINGS]
                  }
                />
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              {loading ? (
                <Skeleton variant="rect" width="100%" height={500} />
              ) : (
                <Directions
                  directionsList={recipe[RECIPE.DIRECTIONS_SECTION]}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>

      <ActionGroup
        hidden={loading}
        handleEdit={handleEditOption}
        handleDelete={handleDeleteOption}
      />
      <DeleteModal
        open={modalOpenState}
        handleConfirm={handleDeleteConfirm}
        handleCancel={handleDeleteCancel}
        title="Delete Recipe?"
        contentText={`Are you sure you want to delete ${recipeTitle}?`}
        confirmLabel="Delete"
      />
    </>
  );
};

RecipeDetail.propTypes = {
  deleteMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(getDeleteRecipeMutation(), {
    name: 'deleteMutation',
  })
)(RecipeDetail);
