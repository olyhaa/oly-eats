import { isEmpty, intersection } from 'ramda';
import { isNumeric } from '../../../utils/ingredientParsing/ingredientComponentsHelper';
import { TIMING_UNITS } from '../../../utils/recipeConstants';
import { SEARCH_ATTRIBUTES, SEARCH_CATEGORIES } from './searchConstants';

const INGREDIENT_FLAG = 'i:';
const SOURCE_FLAG = 's:';
const TAG_FLAG = 'tag:';
const MAX_TIME_FLAG = 'time:';
const ATTRIBUTE_FLAG = 'is:';

export const FILTER_FLAGS = {
  INGREDIENT_FLAG,
  SOURCE_FLAG,
  TAG_FLAG,
  MAX_TIME_FLAG,
  ATTRIBUTE_FLAG,
};

export const removeSurroundingQuotes = (name) => {
  return name.replace(/^"(.+(?="$))"$/, '$1');
};

export const getSearchValue = (filterItem) => {
  return filterItem.value;
};

export const parseFilterString = (filter) => {
  if (isEmpty(filter)) {
    return [];
  }
  /*
  Splits a string by spaces, unless there are quoted strings.
  (?=\S)          # followed by a non-whitespace
  [^"\s]*         #"# zero or more characters that aren't a quote or a whitespace
  (?:             # when a quoted substring occurs:
    "             #"# opening quote
    [^\\"]*       #"# zero or more characters that aren't a quote or a backslash
    (?:           # when a backslash is encountered:
        \\ [\s\S] # an escaped character (including a quote or a backslash)
        [^\\"]*   #"#
    )*
    "             #"# closing quote
    [^"\s]*       #"#
  )*
  */
  const splitFilter = filter.match(
    /(?=\S)[^"\s]*(?:"[^\\"]*(?:\\[\s\S][^\\"]*)*"[^"\s]*)*/g
  );

  // pull out items that are ingredient filters
  const ingredientFilters = splitFilter.filter((word) => {
    return word.indexOf(INGREDIENT_FLAG) === 0;
  });

  // pull out items that are source filters
  const sourceFilters = splitFilter.filter((word) => {
    return word.indexOf(SOURCE_FLAG) === 0;
  });

  // pull out items that are tag filters
  const tagFilters = splitFilter.filter((word) => {
    return word.indexOf(TAG_FLAG) === 0;
  });

  // pull out items that are valid time filters
  const timeFilters = splitFilter.filter((word) => {
    return (
      word.indexOf(MAX_TIME_FLAG) === 0 &&
      isNumeric(removeSurroundingQuotes(word.slice(MAX_TIME_FLAG.length)))
    );
  });

  // pull out items that are valid favorite filters
  const favoriteFilters = splitFilter.filter((word) => {
    return (
      word.indexOf(ATTRIBUTE_FLAG) === 0 &&
      word.slice(ATTRIBUTE_FLAG.length).toLowerCase() ===
        SEARCH_ATTRIBUTES.FAVORITE.toLowerCase()
    );
  });

  const remainingFilters = splitFilter.filter(
    (word) =>
      !ingredientFilters.includes(word) &&
      !sourceFilters.includes(word) &&
      !tagFilters.includes(word) &&
      !timeFilters.includes(word) &&
      !favoriteFilters.includes(word)
  );

  return [].concat(
    remainingFilters.map(removeSurroundingQuotes).map((item) => {
      return {
        value: item,
        category: SEARCH_CATEGORIES.NAME,
      };
    }),
    ingredientFilters
      .map((ingredient) => ingredient.slice(INGREDIENT_FLAG.length))
      .map(removeSurroundingQuotes)
      .map((item) => {
        return {
          value: item,
          category: SEARCH_CATEGORIES.INGREDIENT,
        };
      }),
    sourceFilters
      .map((ingredient) => ingredient.slice(SOURCE_FLAG.length))
      .map(removeSurroundingQuotes)
      .map((item) => {
        return {
          value: item,
          category: SEARCH_CATEGORIES.SOURCE,
        };
      }),
    tagFilters
      .map((ingredient) => ingredient.slice(TAG_FLAG.length))
      .map(removeSurroundingQuotes)
      .map((item) => {
        return {
          value: item,
          category: SEARCH_CATEGORIES.TAGS,
        };
      }),
    timeFilters
      .map((ingredient) => ingredient.slice(MAX_TIME_FLAG.length))
      .map(removeSurroundingQuotes)
      .map((item) => {
        return {
          value: item,
          category: SEARCH_CATEGORIES.TIME,
        };
      }),
    favoriteFilters
      .map((favorite) => favorite.slice(ATTRIBUTE_FLAG.length))
      .map(removeSurroundingQuotes)
      .map((item) => {
        return {
          value: SEARCH_ATTRIBUTES.FAVORITE,
          category: SEARCH_CATEGORIES.ATTRIBUTES,
        };
      })
  );
};

export const doNameFilter = (list, nameFilters) => {
  if (isEmpty(nameFilters)) {
    return list;
  }
  return list.filter((recipe) => {
    return nameFilters.every((nameFilter) =>
      recipe.title.toLowerCase().includes(nameFilter.toLowerCase())
    );
  });
};

export const doIngredientFilter = (list, ingredientFilters) => {
  if (isEmpty(ingredientFilters)) {
    return list;
  }

  return list.filter((recipe) => {
    return recipe.ingredients.some(({ ingredients }) =>
      ingredientFilters.every((ingredientToFilter) =>
        ingredients.some(({ name }) =>
          name.toLowerCase().includes(ingredientToFilter.toLowerCase())
        )
      )
    );
  });
};

export const doSourceFilter = (list, sourceFilters) => {
  if (isEmpty(sourceFilters)) {
    return list;
  }

  return list.filter((recipe) => {
    return sourceFilters.every(
      (sourceFilter) =>
        recipe.source.display
          .toLowerCase()
          .includes(sourceFilter.toLowerCase()) ||
        recipe.source.url?.toLowerCase().includes(sourceFilter)
    );
  });
};

export const doAnyTagFilter = (list, tagFilters) => {
  if (isEmpty(tagFilters)) {
    return list;
  }

  return list.filter((recipe) =>
    tagFilters.every((tagFilter) =>
      recipe.tags.some(({ label }) =>
        label.toLowerCase().includes(tagFilter.toLowerCase())
      )
    )
  );
};

export const doSingleTagFilter = (list, tagId, singleTagFilters) => {
  if (isEmpty(singleTagFilters)) {
    return list;
  }

  return list.filter((recipe) =>
    singleTagFilters.every((tagFilter) =>
      recipe.tags.some(
        ({ label, type }) =>
          label.toLowerCase().includes(tagFilter.toLowerCase()) &&
          type.id === tagId
      )
    )
  );
};

export const getTotalMins = (timingArray) => {
  let totalMins = 0;
  timingArray.forEach((timeItem) => {
    if (timeItem.units === TIMING_UNITS.MINUTE) {
      totalMins += timeItem.value;
    } else if (timeItem.units === TIMING_UNITS.HOUR) {
      totalMins += timeItem.value * 60;
    }
  });
  return totalMins;
};

export const doMaxTimeFilter = (list, maxTimeFilters) => {
  if (isEmpty(maxTimeFilters)) {
    return list;
  }

  return list.filter((recipe) => {
    return maxTimeFilters.every(
      (maxTimeFilter) =>
        getTotalMins(recipe.timing.total) <= Number(maxTimeFilter)
    );
  });
};

export const doFavoriteFilter = (list, favoriteFilters) => {
  if (isEmpty(favoriteFilters)) {
    return list;
  }
  return list.filter((recipe) => {
    return recipe.isFavorite;
  });
};

export const doFilter = (list, filters) => {
  // remove any filters that are an empty string
  const filterList = filters.filter((item) => {
    return item.value !== '';
  });

  // if list is empty, don't bother
  if (isEmpty(list)) {
    return list;
  }
  // if we have no filters, don't filter!
  if (isEmpty(filterList)) {
    return list;
  }

  // otherwise, if we have name filters, get list of filtered recipes
  const filteredByName = doNameFilter(
    list,
    filterList
      .filter((filterItem) => {
        return filterItem.category === SEARCH_CATEGORIES.NAME;
      })
      .map(getSearchValue)
  );

  // otherwise, if we have ingredient filters, get list of filtered recipes
  const filteredByIngredient = doIngredientFilter(
    list,
    filterList
      .filter((filterItem) => {
        return filterItem.category === SEARCH_CATEGORIES.INGREDIENT;
      })
      .map(getSearchValue)
  );

  // otherwise, if we have source filters, get list of filtered recipes
  const filteredBySource = doSourceFilter(
    list,
    filterList
      .filter((filterItem) => {
        return filterItem.category === SEARCH_CATEGORIES.SOURCE;
      })
      .map(getSearchValue)
  );

  // otherwise, if we have source filters, get list of filtered recipes
  const filteredByTag = doAnyTagFilter(
    list,
    filterList
      .filter((filterItem) => {
        return filterItem.category === SEARCH_CATEGORIES.TAGS;
      })
      .map(getSearchValue)
  );

  // otherwise, if we have timing filters, get list of filtered recipes
  const filteredByMaxTime = doMaxTimeFilter(
    list,
    filterList
      .filter((filterItem) => {
        return filterItem.category === SEARCH_CATEGORIES.TIME;
      })
      .map(getSearchValue)
  );

  // otherwise, if we have favorite filters, get list of filtered recipes
  const filteredByFavorite = doFavoriteFilter(
    list,
    filterList
      .filter((filterItem) => {
        return (
          filterItem.category === SEARCH_CATEGORIES.ATTRIBUTES &&
          filterItem.value === SEARCH_ATTRIBUTES.FAVORITE
        );
      })
      .map(getSearchValue)
  );

  return intersection(
    intersection(
      intersection(
        intersection(
          intersection(filteredByName, filteredByIngredient),
          filteredBySource
        ),
        filteredByTag
      ),
      filteredByMaxTime
    ),
    filteredByFavorite
  );
};

export const filterAndSort = (list, filters) => {
  const filteredList = doFilter(list, filters);

  return filteredList.sort((item1, item2) => {
    return item1.title.localeCompare(item2.title);
  });
};

export const convertToFilterString = (filterArray) => {
  const filterStringArray = filterArray.map((item) => {
    const { value, category } = item;
    let prefix = '';
    let skipValue = false;
    switch (category) {
      case SEARCH_CATEGORIES.NOT_INITIALIZED:
        skipValue = true;
        break;
      case SEARCH_CATEGORIES.NAME:
        break;
      case SEARCH_CATEGORIES.INGREDIENT:
        prefix = INGREDIENT_FLAG;
        break;
      case SEARCH_CATEGORIES.SOURCE:
        prefix = SOURCE_FLAG;
        break;
      case SEARCH_CATEGORIES.TAGS:
        prefix = TAG_FLAG;
        break;
      case SEARCH_CATEGORIES.TIME:
        prefix = MAX_TIME_FLAG;
        break;
      case SEARCH_CATEGORIES.ATTRIBUTES:
        prefix = ATTRIBUTE_FLAG;
        break;
      default:
        break;
    }
    if (skipValue || value.length === 0) {
      return '';
    }
    if (value.indexOf(' ') >= 0) {
      return `${prefix}"${value.toLowerCase()}"`;
    }
    return `${prefix}${value.toLowerCase()}`;
  });
  let newFilterString = '';
  for (let i = 0; i < filterStringArray.length; i++) {
    if (filterStringArray[i].length > 0) {
      if (newFilterString.length > 0) {
        newFilterString += ' ';
      }
      newFilterString += filterStringArray[i];
    }
  }
  return newFilterString;
};
