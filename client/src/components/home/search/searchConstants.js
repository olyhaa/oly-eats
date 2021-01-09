import { isEmpty } from 'ramda';
import { RECIPE } from 'utils/recipeConstants';

export const FILTER_TYPE = {
  TEXT: 'text',
  NUM: 'num',
};

export const SEARCH_TERMS = [
  {
    value: RECIPE.TITLE,
    label: 'Name',
    type: FILTER_TYPE.TEXT,
  },
  {
    value: RECIPE.INGREDIENT_SECTION_INGREDIENTS,
    label: 'Ingredient',
    type: FILTER_TYPE.TEXT,
  },
  {
    value: RECIPE.SOURCE,
    label: 'Source',
    type: FILTER_TYPE.TEXT,
  },
  {
    value: RECIPE.TIMING_TOTAL,
    label: 'Time',
    type: FILTER_TYPE.NUM,
  },
  {
    value: RECIPE.TAGS,
    label: 'Tag',
    type: FILTER_TYPE.TEXT,
  },
];

export const TEXT_FILTERS = [
  {
    value: 'CONTAINS',
    label: 'contains',
  },
  // {value: 'NOT_CONTAINS', label: does not contain'},
];

export const NUM_FILTERS = [
  {
    value: 'LESS_THAN',
    label: 'less than',
  },
  //{ value: 'GREATER_THAN', label: 'greater than' }
];

export const searchTermIsText = (value) => {
  return !isEmpty(
    SEARCH_TERMS.filter((searchItem) => {
      return searchItem.value === value && searchItem.type === FILTER_TYPE.TEXT;
    })
  );
};

export const searchTermIsNum = (value) => {
  return !isEmpty(
    SEARCH_TERMS.filter((searchItem) => {
      return searchItem.value === value && searchItem.type === FILTER_TYPE.NUM;
    })
  );
};
