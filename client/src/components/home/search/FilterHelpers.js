import { isEmpty, intersection } from 'ramda';

export const INGREDIENT_FLAG = 'i:';
export const SOURCE_FLAG = 's:';

export const removeSurroundingQuotes = (name) => {
  return name.replace(/^"(.+(?="$))"$/, '$1');
};

export const parseFilterString = (filter) => {
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

  const remainingFilters = splitFilter.filter(
    (word) => !ingredientFilters.includes(word) && !sourceFilters.includes(word)
  );

  return {
    nameFilters: remainingFilters.map(removeSurroundingQuotes),
    ingredientFilters: ingredientFilters
      .map((ingredient) => ingredient.slice(INGREDIENT_FLAG.length))
      .map(removeSurroundingQuotes),
    sourceFilters: sourceFilters
      .map((ingredient) => ingredient.slice(SOURCE_FLAG.length))
      .map(removeSurroundingQuotes),
  };
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
    return sourceFilters.every((sourceFilter) =>
      recipe.source.display.toLowerCase().includes(sourceFilter.toLowerCase())
    );
  });
};

export const doFilter = (
  list,
  { nameFilters = [], ingredientFilters = [], sourceFilters = [] }
) => {
  // if list is empty, don't bother
  if (isEmpty(list)) {
    return list;
  }
  // if we have no filters, don't filter!
  if (
    isEmpty(nameFilters) &&
    isEmpty(ingredientFilters) &&
    isEmpty(sourceFilters)
  ) {
    return list;
  }

  // otherwise, if we have name filters, get list of filtered recipes
  const filteredByName = doNameFilter(list, nameFilters);

  // otherwise, if we have ingredient filters, get list of filtered recipes
  const filteredByIngredient = doIngredientFilter(list, ingredientFilters);

  // otherwise, if we have source filters, get list of filtered recipes
  const filteredBySource = doSourceFilter(list, sourceFilters);

  return intersection(
    intersection(filteredByName, filteredByIngredient),
    filteredBySource
  );
};

export const filterAndSort = (list, filters) => {
  const filteredList = doFilter(list, filters);

  return filteredList.sort((item1, item2) => {
    return item1.title.localeCompare(item2.title);
  });
};
