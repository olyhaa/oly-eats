const ID = 'id';
const TITLE = 'title';
const DESCRIPTION = 'description';
const PHOTO_URL = 'photo';
const SERVINGS = 'servings';
const DATE_ADDED = 'dateAdded';
const LAST_UPDATED = 'lastUpdated';
const TAGS = 'tags';

// INGREDIENTS
const INGREDIENTS = 'ingredients';
const INGREDIENTS_LABEL = 'ingredientsLabel';
const INGREDIENTS_LIST = 'ingredientsList';

// DIRECTIONS
const DIRECTIONS = 'directions';
const DIRECTIONS_LABEL = 'directionsLabel';
const DIRECTIONS_LIST = 'directionsList';

// SOURCE
const SOURCE_DISPLAY = 'sourceDisplay';
const SOURCE_URL = 'sourceURL';

// TIMING
const TIMING_PREP_VALUE_HOURS = 'timingPrepValueHours';
const TIMING_PREP_VALUE_MINS = 'timingPrepValueMins';
const TIMING_TOTAL_VALUE_HOURS = 'timingTotalValueHours';
const TIMING_TOTAL_VALUE_MINS = 'timingTotalValueMins';

export const FIELDS = {
  ID,
  TITLE,
  DESCRIPTION,
  PHOTO_URL,
  SOURCE_DISPLAY,
  SOURCE_URL,
  SERVINGS,
  TIMING_PREP_VALUE_HOURS,
  TIMING_PREP_VALUE_MINS,
  TIMING_TOTAL_VALUE_HOURS,
  TIMING_TOTAL_VALUE_MINS,
  INGREDIENTS,
  INGREDIENTS_LABEL,
  INGREDIENTS_LIST,
  DIRECTIONS,
  DIRECTIONS_LABEL,
  DIRECTIONS_LIST,
  TAGS,
  DATE_ADDED,
  LAST_UPDATED,
};

export const requiredFields = [
  FIELDS.TITLE,
  FIELDS.DESCRIPTION,
  FIELDS.SOURCE_DISPLAY,
  FIELDS.SERVINGS,
];

export const isRequired = (field) => {
  return requiredFields.includes(field);
};

export const isField = (field) => {
  const fieldKeys = Object.keys(FIELDS);
  for (let i = 0; i < fieldKeys.length; i++) {
    if (FIELDS[fieldKeys[i]] === field) {
      return true;
    }
  }
  return false;
};
