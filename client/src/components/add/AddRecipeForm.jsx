import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, Fields } from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import {
  getMealTypeListQuery,
  getCategoryListQuery,
  getEquipmentListQuery,
  getCuisineListQuery,
} from 'utils/FetchData';
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

function AddRecipeForm({ pristine, handleSubmit, submitting, isEdit }) {
  const classes = useStyles();
  const { data: categoryData } = useQuery(getCategoryListQuery());
  const { data: equipmentData } = useQuery(getEquipmentListQuery());
  const { data: mealTypeData } = useQuery(getMealTypeListQuery());
  const { data: cuisineData } = useQuery(getCuisineListQuery());

  return (
    <form onSubmit={handleSubmit}>
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
        {mealTypeData?.allMealTypes && (
          <Field
            className={classes.formItem}
            name={FIELDS.MEAL_TYPE}
            component={MultipleSelectField}
            required={isRequired(FIELDS.MEAL_TYPE)}
            childrenList={mealTypeData?.allMealTypes}
            label="Meal Type"
          />
        )}
        {cuisineData?.allCuisines && (
          <Field
            className={classes.formItem}
            name={FIELDS.CUISINE}
            component={MultipleSelectField}
            required={isRequired(FIELDS.CUISINE)}
            childrenList={cuisineData?.allCuisines}
            label="Cuisine"
          />
        )}
        {equipmentData?.allEquipment && (
          <Field
            className={classes.formItem}
            name={FIELDS.EQUIPMENT}
            component={MultipleSelectField}
            required={isRequired(FIELDS.EQUIPMENT)}
            childrenList={equipmentData?.allEquipment}
            label="Special Equipment"
          />
        )}
        {categoryData?.allCategories && (
          <Field
            className={classes.formItem}
            name={FIELDS.CATEGORY}
            component={MultipleSelectField}
            required={isRequired(FIELDS.CATEGORY)}
            childrenList={categoryData?.allCategories}
            label="Category"
          />
        )}
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
    </form>
  );
}

AddRecipeForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool,
};

AddRecipeForm.defaultProps = {
  isEdit: false,
};

export default reduxForm({
  form: 'AddRecipeForm', // a unique identifier for this form
  validate: validateAll,
  asyncValidate: asyncValidateAll,
  onSubmit: saveRecipe,
  asyncBlurFields: [FIELDS.PHOTO_URL],
})(AddRecipeForm);
