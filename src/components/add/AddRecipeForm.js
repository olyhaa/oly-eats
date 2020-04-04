import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { renderTextBoxField, renderTextField } from './Renderers';
import { FIELDS } from './constants';
import { validateAll } from './Validators';
import { saveRecipe } from './saveRecipe';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5)
  },
  formItem: {},
  submitButton: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: 'auto',
    position: 'fixed'
  }
}));

const AddRecipeForm = ({ pristine, handleSubmit, submitting }) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.root}>
        <Field
          className={classes.formItem}
          name={FIELDS.TITLE}
          component={renderTextField}
          label="Title"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.DESCRIPTION}
          component={renderTextBoxField}
          label="Description"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.PHOTO_URL}
          component={renderTextField}
          label="Photo URL"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.SOURCE_DISPLAY}
          component={renderTextField}
          label="Source Display Name"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.SOURCE_URL}
          component={renderTextField}
          label="Source URL"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.INGREDIENTS_LIST}
          component={renderTextBoxField}
          label="Ingredients"
          helperText="Add each ingredient to a new line"
        />
        <Field
          className={classes.formItem}
          name={FIELDS.DIRECTIONS_LIST}
          component={renderTextBoxField}
          label="Directions"
          helperText="Add each step to a new line"
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
};

export default reduxForm({
  form: 'AddRecipeForm', // a unique identifier for this form
  validate: validateAll,
  onSubmit: saveRecipe
})(AddRecipeForm);
