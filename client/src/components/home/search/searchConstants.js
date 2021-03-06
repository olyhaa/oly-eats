import { isEmpty } from 'ramda';

export const SEARCH_CATEGORIES = {
  NOT_INITIALIZED: undefined,
  NAME: 'NAME',
  INGREDIENT: 'INGREDIENT',
  SOURCE: 'SOURCE',
  TIME: 'TIME',
  TAGS: 'TAGS',
  ATTRIBUTES: 'ATTRIBUTES',
};

export const SEARCH_ATTRIBUTES = {
  FAVORITE: 'FAVORITE',
};

export const FILTER_TYPE = {
  TEXT: 'text',
  NUM: 'num',
  NONE: 'none',
};

export const SEARCH_TERMS = [
  {
    value: SEARCH_CATEGORIES.NOT_INITIALIZED,
    label: 'Search',
    type: FILTER_TYPE.NONE,
    valueLabel: undefined,
  },
  {
    value: SEARCH_CATEGORIES.NAME,
    label: 'Name',
    type: FILTER_TYPE.TEXT,
    valueLabel: 'Name',
  },
  {
    value: SEARCH_CATEGORIES.INGREDIENT,
    label: 'Ingredient',
    type: FILTER_TYPE.TEXT,
    valueLabel: 'Name',
  },
  {
    value: SEARCH_CATEGORIES.SOURCE,
    label: 'Source',
    type: FILTER_TYPE.TEXT,
    valueLabel: 'Name',
  },
  {
    value: SEARCH_CATEGORIES.TIME,
    label: 'Max Time',
    type: FILTER_TYPE.NUM,
    valueLabel: 'Minutes',
  },
  {
    value: SEARCH_CATEGORIES.TAGS,
    label: 'Tag',
    type: FILTER_TYPE.TEXT,
    valueLabel: 'Name',
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
  // { value: 'GREATER_THAN', label: 'greater than' }
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
