import { FIELDS } from './constants';

const validatePhotoUrl = photoUrl => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '.(jpeg|jpg|gif|png)$', // must be picture
    'i'
  ); // fragment locator

  return photoUrl.length !== 0 && !pattern.test(photoUrl);
};

const validateUrl = urlString => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      'i'
  ); // fragment locator

  return urlString.length !== 0 && !pattern.test(urlString);
};

export const validateAll = values => {
  const errors = {};
  const requiredFields = [
    FIELDS.TITLE,
    FIELDS.DESCRIPTION,
    FIELDS.SOURCE_DISPLAY,
    FIELDS.SERVINGS
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values[FIELDS.PHOTO] && validatePhotoUrl(values[FIELDS.PHOTO])) {
    errors[FIELDS.PHOTO] = 'Invalid photo URL';
  }
  if (values[FIELDS.SOURCE_URL] && validateUrl(values[FIELDS.SOURCE_URL])) {
    errors[FIELDS.SOURCE_URL] = 'Invalid photo URL';
  }
  return errors;
};
