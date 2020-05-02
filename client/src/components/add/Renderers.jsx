/* eslint-disable react/prop-types */
import React from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FIELDS, isRequired } from './constants/formConstants';

export const onlyNums = (value, previousValue) => {
  const pattern = new RegExp(/^[0-9]*$/);
  return pattern.test(value) ? Math.min(Number(value), 100) : previousValue;
};

export const renderTextBoxField = ({
  input,
  label,
  meta: { touched, error },
  required,
  helperText,
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    fullWidth
    required={required}
    helperText={touched && error ? error : helperText}
    multiline
    rows={4}
    rowsMax={20}
    margin="normal"
    variant="outlined"
    {...input}
    {...custom}
  />
);

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  required,
  helperText,
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    fullWidth
    required={required}
    helperText={touched && error ? error : helperText}
    variant="outlined"
    margin="normal"
    {...input}
    {...custom}
  />
);

export const renderNumberField = ({
  input,
  label,
  meta: { touched, error },
  required,
  helperText,
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    fullWidth
    required={required}
    variant="outlined"
    margin="normal"
    helperText={touched && error ? error : helperText}
    {...input}
    {...custom}
  />
);

export const renderIngredients = ({ fields, meta: { dirty, error } }) => (
  <>
    {fields.map((section, index) => (
      <>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={11}>
            <Field
              name={`${section}.${FIELDS.INGREDIENTS_LABEL}`}
              component={renderTextField}
              label={`Ingredient Section #${index + 1}`}
            />
          </Grid>
          <Grid item xs={1}>
            <Fab
              type="button"
              size="small"
              color="secondary"
              onClick={() => fields.remove(index)}
            >
              <CloseIcon />
            </Fab>
          </Grid>
        </Grid>
        <Field
          name={`${section}.${FIELDS.INGREDIENTS_LIST}`}
          component={renderTextBoxField}
          required
          label="Ingredients"
          helperText="Add each ingredient to a new line"
        />
      </>
    ))}
    <Grid container justify="center" direction="column">
      <Fab
        type="button"
        variant="extended"
        color="secondary"
        size="medium"
        onClick={() => fields.push({})}
      >
        <AddIcon />
        Add New Ingredient Section
      </Fab>
      <FormHelperText error={dirty && error}>{error}</FormHelperText>
    </Grid>
  </>
);

export const renderDirections = ({ fields, meta: { dirty, error } }) => (
  <div>
    {fields.map((section, index) => (
      <>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={11}>
            <Field
              name={`${section}.${FIELDS.DIRECTIONS_LABEL}`}
              component={renderTextField}
              buttonAction={() => fields.remove(index)}
              label={`Direction Section #${index + 1}`}
            />
          </Grid>
          <Grid item xs={1}>
            <Fab
              type="button"
              size="small"
              color="secondary"
              onClick={() => fields.remove(index)}
            >
              <CloseIcon />
            </Fab>
          </Grid>
        </Grid>
        <Field
          name={`${section}.${FIELDS.DIRECTIONS_LIST}`}
          component={renderTextBoxField}
          required
          label="Directions"
          helperText="Add each step to a new line"
        />
      </>
    ))}
    <Grid container justify="center" direction="column">
      <Fab
        type="button"
        variant="extended"
        color="secondary"
        size="medium"
        onClick={() => fields.push({})}
      >
        <AddIcon />
        Add New Direction Section
      </Fab>
      <FormHelperText error={dirty && error}>{error}</FormHelperText>
    </Grid>
  </div>
);
