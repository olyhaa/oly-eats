import { FIELDS, requiredFields } from './formConstants';
import { transformTiming } from './saveRecipe';

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

const isTimeWithinRange = (
  prepHours = 0,
  prepMins = 0,
  totalHours = 0,
  totalMins = 0
) => {
  const prep = Number(prepMins) + 60 * Number(prepHours);
  const total = Number(totalMins) + 60 * Number(totalHours);
  return total >= prep;
};

export const validateAll = (values) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

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
  if (
    !isTimeWithinRange(
      values[FIELDS.TIMING_PREP_VALUE_HOURS],
      values[FIELDS.TIMING_PREP_VALUE_MINS],
      values[FIELDS.TIMING_TOTAL_VALUE_HOURS],
      values[FIELDS.TIMING_TOTAL_VALUE_MINS]
    )
  ) {
    errors[FIELDS.TIMING_TOTAL_VALUE_HOURS] =
      'Total time must be greater than Prep Time';
  }

  return errors;
};

export const validatePhotoUrl = async (url) => {
  return new Promise((resolve, reject) => {
    const timeout = 5000;
    let timer;
    const img = new Image();
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error('Error'));
    };
    img.onabort = () => {
      clearTimeout(timer);
      reject(new Error('Aborted'));
    };
    img.onload = () => {
      clearTimeout(timer);
      resolve('Success');
    };
    timer = setTimeout(() => {
      // reset .src to invalid URL so it stops previous
      // loading, but doens't trigger new load
      img.src = '//!!!!/noexist.jpg';
      reject(new Error('Timeout'));
    }, timeout);
    img.src = url;
  });
};

export const asyncValidateAll = async (values) => {
  if (values[FIELDS.PHOTO_URL]) {
    return validatePhotoUrl(values[FIELDS.PHOTO_URL]).then(
      () => {
        return Promise.resolve({});
      },
      () => {
        const error = {};
        error[FIELDS.PHOTO_URL] = 'URL must be a photo';
        throw error;
      }
    );
  }
  return Promise.resolve({});
};
