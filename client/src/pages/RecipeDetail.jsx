import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import compose from 'lodash.flowright';
import { graphql } from '@apollo/react-hoc';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  getRecipeQuery,
  removeNulls,
  getDeleteRecipeMutation,
} from 'utils/FetchData';
import { useQuery } from 'react-apollo';
import { RECIPE } from 'utils/recipeConstants';
import ActionGroup from 'components/add/ActionGroup';
import DeleteRecipeModal from 'components/add/DeleteRecipeModal';
import Ingredients from '../components/recipe/Ingredients';
import Directions from '../components/recipe/Directions';
import Overview from '../components/recipe/Overview';
import Header from '../components/Header';
import history from '../store/history';
import CarrotIcon from '../images/carrot.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
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
    margin: theme.spacing(5),
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  photoGrid: {
    width: '100%',
    height: 'auto',
    alignSelf: 'flex-end',
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: 'auto',
    position: 'fixed',
  },
}));

function RecipeDetail({ deleteMutation }) {
  const classes = useStyles();
  const { id } = useParams();
  const { data, error, loading } = useQuery(getRecipeQuery(), {
    variables: { id },
  });
  const [modalOpenState, setModalOpen] = React.useState(false);

  // TODO
  if (loading) {
    return <span>Loading!</span>;
  }
  if (error) {
    return <span>Error!</span>;
  }

  const { recipe } = removeNulls(data);

  const handleEditOption = () => {
    history.push(`/editRecipe/${id}`);
  };

  const handleDeleteOption = () => {
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteMutation({
      variables: { id },
    }).then((result) => {
      if (result?.data?.deleteRecipe?.success) {
        setModalOpen(false);
        history.push(`/home`);
      }
    });
  };

  const handleDeleteCancel = () => {
    setModalOpen(false);
  };

  if (!recipe) {
    return (
      <>
        <Header title="OlyEats: No Recipe Found" />
        <div className={classes.missingRecipe}>
          <img src={CarrotIcon} className={classes.carrot} alt="" />
          <p className={classes.carrotText}>Nothing but carrots here!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={`OlyEats: ${recipe[RECIPE.TITLE]}`} />
      <div className={classes.mainContent}>
        <div className={classes.root}>
          <Grid container spacing={2} alignItems="stretch">
            {recipe[RECIPE.PHOTO] && (
              <Grid className={classes.photoGrid} item xs={6}>
                <Image
                  title={recipe[RECIPE.TITLE]}
                  imageSrc={recipe[RECIPE.PHOTO]}
                />
              </Grid>
            )}
            <Grid
              className={classes.photoGrid}
              item
              xs={recipe[RECIPE.PHOTO] ? 6 : 12}
            >
              <Overview
                description={recipe[RECIPE.DESCRIPTION]}
                prepTime={recipe[RECIPE.TIMING][RECIPE.TIMING_PREP]}
                totalTime={recipe[RECIPE.TIMING][RECIPE.TIMING_TOTAL]}
                servings={recipe[RECIPE.SERVINGS]}
                source={recipe[RECIPE.SOURCE]}
                dateAdded={recipe[RECIPE.META][RECIPE.DATE_ADDED]}
                lastUpdated={recipe[RECIPE.META][RECIPE.DATE_UPDATED]}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.root}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={4}>
              <Ingredients ingredientList={recipe[RECIPE.INGREDIENT_SECTION]} />
            </Grid>
            <Grid item xs={8}>
              <Directions directionsList={recipe[RECIPE.DIRECTIONS_SECTION]} />
            </Grid>
          </Grid>
        </div>
      </div>
      <ActionGroup
        handleEdit={handleEditOption}
        handleDelete={handleDeleteOption}
      />
      <DeleteRecipeModal
        open={modalOpenState}
        handleDelete={handleDeleteConfirm}
        handleCancel={handleDeleteCancel}
      />
    </>
  );
}
RecipeDetail.propTypes = {
  deleteMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(getDeleteRecipeMutation(), {
    name: 'deleteMutation',
  })
)(RecipeDetail);
