import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderNumberField, onlyNums } from './Renderers';
import { isField } from './constants/formConstants';
import OutlinedDiv from './OutlinedDiv';
import { isValidTime } from './utils/Validators';

const TimingInputComponent = ({ label, required, ...nameProps }) => {
  const fields = Object.keys(nameProps).filter((item) => {
    return isField(item);
  });
  const hourField = nameProps[fields[0]];
  const minField = nameProps[fields[1]];

  const hourMeta = hourField?.meta;
  const minMeta = minField?.meta;

  let error;
  if (hourMeta.touched && hourMeta.error) {
    error = hourMeta.error;
  }
  if (minMeta.touched && minMeta.error) {
    if (error) {
      error += ', ';
    }
    error = minMeta.error;
  }

  if (
    (hourMeta.touched || minMeta.touched) &&
    !error &&
    !isValidTime(hourField?.input?.value, minField?.input?.value)
  ) {
    error = `${label} must be greater than zero`;
  }

  return (
    <OutlinedDiv label={label} required={required} error={error}>
      {fields.map((field, index) => {
        return (
          <Field
            data-test={`add-recipe-${field}`}
            key={field}
            name={field}
            fillWidth={false}
            normalize={onlyNums}
            component={renderNumberField}
            label={index === 0 ? 'Hours' : 'Minutes'}
          />
        );
      })}
    </OutlinedDiv>
  );
};

TimingInputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

TimingInputComponent.defaultProps = {
  required: false,
};

export default TimingInputComponent;
