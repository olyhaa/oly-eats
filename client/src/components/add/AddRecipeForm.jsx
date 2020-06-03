import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import compose from 'lodash.flowright';
import { graphql } from '@apollo/react-hoc';
import { Field, FieldArray, reduxForm, Fields } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import { RECIPE } from 'utils/recipeConstants';
import {
  getTagsListQuery,
  getAddRecipeMutation,
  getUpdateRecipeMutation,
} from 'utils/FetchData';
import history from '../../store/history';
import {
  renderTextBoxField,
  renderTextField,
  renderNumberField,
  onlyNums,
  renderIngredients,
  renderDirections,
} from './Renderers';
import { FIELDS, isRequired } from './constants/formConstants';
import { validateAll, asyncValidateAll } from './utils/Validators';
import { saveRecipe } from './utils/saveRecipe';
import MultipleSelectField from './MultipleSelectField';
import TimingInputComponent from './TimingInputComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    maxWidth: theme.spacing(125),
  },
  loadingContainer: {
    display: 'flex',
    margin: theme.spacing(3),
  },
  loading: {
    margin: 'auto',
  },
  formItem: {},
  submitButton: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: 'auto',
    position: 'fixed',
  },
}));

const handleSuccess = (result) => {
  if (result?.data?.addRecipe?.success) {
    const { id } = result.data.addRecipe.recipe;
    history.push(`/recipe/${id}`);
  } else if (result?.data?.updateRecipe?.success) {
    const { id } = result.data.updateRecipe.recipe;
    history.push(`/recipe/${id}`);
  }
};

function AddRecipeForm({
  pristine,
  handleSubmit,
  submitting,
  submitSucceeded,
  isEdit,
  addMutation,
  updateMutation,
}) {
  const classes = useStyles();
  const {
    data: allTagsData,
    loading: allTagsLoading,
    error: allTagsError,
  } = useQuery(getTagsListQuery());

  const handleSubmitForm = (data) => {
    if (isEdit) {
      return updateMutation({
        variables: { id: data[RECIPE.ID], recipe: saveRecipe(data) },
      });
    }
    return addMutation({
      variables: { recipe: saveRecipe(data) },
    });
  };
  if (submitting || allTagsLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress className={classes.loading} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Paper className={classes.root}>
        <Field
          className={classes.formItem}
          name={FIELDS.TITLE}
          component={renderTextField}
          required={isRequired(FIELDS.TITLE)}
          label="Title"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.DESCRIPTION}
          component={renderTextBoxField}
          required={isRequired(FIELDS.DESCRIPTION)}
          label="Description"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.PHOTO_URL}
          component={renderTextField}
          required={isRequired(FIELDS.PHOTO_URL)}
          label="Photo URL"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.SOURCE_DISPLAY}
          component={renderTextField}
          required={isRequired(FIELDS.SOURCE_DISPLAY)}
          label="Source Display Name"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.SOURCE_URL}
          component={renderTextField}
          required={isRequired(FIELDS.SOURCE_URL)}
          label="Source URL"
        />
        <FieldArray name={FIELDS.INGREDIENTS} component={renderIngredients} />
        <FieldArray name={FIELDS.DIRECTIONS} component={renderDirections} />
        <Field
          className={classes.formItem}
          name={FIELDS.SERVINGS}
          component={renderNumberField}
          normalize={onlyNums}
          required={isRequired(FIELDS.SERVINGS)}
          label="Servings"
        />
        <Fields
          className={classes.formItem}
          names={[
            FIELDS.TIMING_PREP_VALUE_HOURS,
            FIELDS.TIMING_PREP_VALUE_MINS,
          ]}
          component={TimingInputComponent}
          required
          label="Prep Time"
        />
        <Fields
          className={classes.formItem}
          names={[
            FIELDS.TIMING_TOTAL_VALUE_HOURS,
            FIELDS.TIMING_TOTAL_VALUE_MINS,
          ]}
          required
          component={TimingInputComponent}
          label="Total Time"
        />
        {allTagsData &&
          allTagsData.allTagTypes.map((tagType, index) => {
            return (
              <Field
                className={classes.formItem}
                name={`${FIELDS.TAGS}_${tagType.id}`}
                component={MultipleSelectField}
                childrenList={tagType.tags}
                label={tagType.label}
                key={index}
              />
            );
          })}
      </Paper>
      <Fab
        type="submit"
        disabled={!isEdit && (pristine || submitting)}
        variant="extended"
        color="primary"
        className={classes.submitButton}
      >
        {isEdit ? (
          <>
            <CheckIcon />
            Update Recipe!
          </>
        ) : (
          <>
            <AddIcon />
            Add Recipe!
          </>
        )}
      </Fab>
      {submitSucceeded && <p>Sent!!!</p>}
    </form>
  );
}

AddRecipeForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool,
  addMutation: PropTypes.func.isRequired,
  updateMutation: PropTypes.func.isRequired,
};

AddRecipeForm.defaultProps = {
  isEdit: false,
};

export default compose(
  graphql(getAddRecipeMutation(), {
    name: 'addMutation',
  }), // https://www.apollographql.com/docs/react/api/react-apollo/#configname
  graphql(getUpdateRecipeMutation(), {
    name: 'updateMutation',
  }),
  reduxForm({
    form: 'AddRecipeForm', // a unique identifier for this form
    validate: validateAll,
    asyncValidate: asyncValidateAll,
    onSubmitSuccess: handleSuccess,
    asyncBlurFields: [FIELDS.PHOTO_URL],
  })
)(AddRecipeForm);
