import { FIELDS, requiredFields } from './constants';
import { transformTiming } from './saveRecipe';

export const isValidPhotoUrl = (photoUrl) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '.(jpeg|jpg|gif|png)$', // must be picture
    'i'
  ); // fragment locator

  return !photoUrl || photoUrl.length === 0 || pattern.test(photoUrl);
};

const isValidUrl = (urlString) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*', // port and path
    'i'
  ); // fragment locator

  return !urlString || urlString.length === 0 || pattern.test(urlString);
};

const isValidNumber = (number) => {
  return number ? Math.sign(number) >= 0 : true;
};

export const isValidTime = (minutes, hours) => {
  return transformTiming(minutes, hours).length > 0;
};

export const validateAll = (values) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (!isValidPhotoUrl(values[FIELDS.PHOTO_URL])) {
    errors[FIELDS.PHOTO_URL] = 'Invalid photo URL';
  }
  if (!isValidUrl(values[FIELDS.SOURCE_URL])) {
    errors[FIELDS.SOURCE_URL] = 'Invalid URL';
  }

  // TIMINGS
  if (!isValidNumber(values[FIELDS.TIMING_PREP_VALUE_HOURS])) {
    errors[FIELDS.TIMING_PREP_VALUE_HOURS] = 'Hours must be a positive number';
  }
  if (!isValidNumber(values[FIELDS.TIMING_PREP_VALUE_MINS])) {
    errors[FIELDS.TIMING_PREP_VALUE_MINS] = 'Minutes must be a positive number';
  }
  if (!isValidNumber(values[FIELDS.TIMING_TOTAL_VALUE_HOURS])) {
    errors[FIELDS.TIMING_TOTAL_VALUE_HOURS] = 'Hours must be a positive number';
  }
  if (!isValidNumber(values[FIELDS.TIMING_TOTAL_VALUE_MINS])) {
    errors[FIELDS.TIMING_TOTAL_VALUE_MINS] =
      'Minutes must be a positive number';
  }
  return errors;
};
