import { isEmpty, intersection } from 'ramda';

export const INGREDIENT_FLAG = 'i:';

export const parseFilterString = (filter) => {
  const splitFilter = filter.split(' ');
  const ingredientFilters = splitFilter.filter((word) => {
    return word.indexOf(INGREDIENT_FLAG) === 0;
  });

  const excludingIngredients = splitFilter.filter(
    (word) => !ingredientFilters.includes(word)
  );

  return {
    nameFilters: excludingIngredients,
    ingredientFilters: ingredientFilters.map((ingredient) =>
      ingredient.slice(INGREDIENT_FLAG.length)
    ),
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

export const doFilter = (list, { nameFilters, ingredientFilters }) => {
  // if list is empty, don't bother
  if (isEmpty(list)) {
    return list;
  }
  // if we have no filters, don't filter!
  if (isEmpty(nameFilters) && isEmpty(ingredientFilters)) {
    return list;
  }

  // otherwise, if we have name filters, get list of filtered recipes
  const filteredByName = doNameFilter(list, nameFilters);

  // otherwise, if we have ingredient filters, get list of filtered recipes
  const filteredByIngredient = doIngredientFilter(list, ingredientFilters);

  return intersection(filteredByName, filteredByIngredient);
};

export const filterAndSort = (list, filters) => {
  const filteredList = doFilter(list, filters);

  return filteredList.sort((item1, item2) => {
    return item1.title.localeCompare(item2.title);
  });
};
