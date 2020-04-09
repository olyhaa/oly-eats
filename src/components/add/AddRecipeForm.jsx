import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import {
  getMealTypeList,
  getCategoryList,
  getEquipmentList,
  getCuisineList,
} from 'utils/FetchData';
import {
  renderTextBoxField,
  renderTextField,
  renderNumberField,
} from './Renderers';
import { FIELDS, isRequired } from './constants';
import { validateAll } from './Validators';
import { saveRecipe } from './saveRecipe';
import OutlinedDiv from './OutlinedDiv';
import MultipleSelectField from './MultipleSelectField';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
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

function AddRecipeForm({ pristine, handleSubmit, submitting }) {
  const classes = useStyles();
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
        <Field
          className={classes.formItem}
          name={FIELDS.INGREDIENTS_LIST}
          component={renderTextBoxField}
          required={isRequired(FIELDS.INGREDIENTS_LIST)}
          label="Ingredients"
          helperText="Add each ingredient to a new line"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.DIRECTIONS_LIST}
          component={renderTextBoxField}
          required={isRequired(FIELDS.DIRECTIONS_LIST)}
          label="Directions"
          helperText="Add each step to a new line"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.SERVINGS}
          component={renderNumberField}
          required={isRequired(FIELDS.SERVINGS)}
          label="Servings"
        />
        <OutlinedDiv label="Prep Time" required>
          <Field
            className={classes.formItem}
            name={FIELDS.TIMING_PREP_VALUE_HOURS}
            component={renderNumberField}
            required={isRequired(FIELDS.TIMING_PREP_VALUE_HOURS)}
            label="Hours"
          />
          <Field
            className={classes.formItem}
            name={FIELDS.TIMING_PREP_VALUE_MINS}
            component={renderNumberField}
            required={isRequired(FIELDS.TIMING_PREP_VALUE_MINS)}
            label="Minutes"
          />
        </OutlinedDiv>
        <OutlinedDiv label="Total Time" required>
          <Field
            className={classes.formItem}
            name={FIELDS.TIMING_TOTAL_VALUE_HOURS}
            component={renderNumberField}
            required={isRequired(FIELDS.TIMING_TOTAL_VALUE_HOURS)}
            label="Hours"
          />
          <Field
            className={classes.formItem}
            name={FIELDS.TIMING_TOTAL_VALUE_MINS}
            component={renderNumberField}
            required={isRequired(FIELDS.TIMING_TOTAL_VALUE_MINS)}
            label="Minutes"
          />
        </OutlinedDiv>
        <Field
          className={classes.formItem}
          name={FIELDS.MEAL_TYPE}
          component={MultipleSelectField}
          required={isRequired(FIELDS.MEAL_TYPE)}
          childrenList={getMealTypeList()}
          label="Meal Type"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.CUISINE}
          component={MultipleSelectField}
          required={isRequired(FIELDS.CUISINE)}
          childrenList={getCuisineList()}
          label="Cuisine"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.EQUIPMENT}
          component={MultipleSelectField}
          required={isRequired(FIELDS.EQUIPMENT)}
          childrenList={getEquipmentList()}
          label="Special Equipment"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.CATEGORY}
          component={MultipleSelectField}
          required={isRequired(FIELDS.CATEGORY)}
          childrenList={getCategoryList()}
          label="Category"
        />
      </Paper>
      <Fab
        type="submit"
        disabled={pristine || submitting}
        variant="extended"
        color="primary"
        className={classes.submitButton}
      >
        <AddIcon />
        Add Recipe!
      </Fab>
    </form>
  );
}

AddRecipeForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'AddRecipeForm', // a unique identifier for this form
  validate: validateAll,
  onSubmit: saveRecipe,
})(AddRecipeForm);
