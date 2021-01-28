const HOME_PAGE = 'home';
const ERROR_PAGE = 'error';
const ADMIN_PAGE = 'admin';
const RECIPE_PAGE = 'recipe';
const ADD_RECIPE_PAGE = 'addRecipe';
const EDIT_RECIPE_PAGE = 'editRecipe';

export const PAGE_ROUTES = {
  HOME_PAGE,
  ERROR_PAGE,
  ADMIN_PAGE,
  RECIPE_PAGE,
  ADD_RECIPE_PAGE,
  EDIT_RECIPE_PAGE,
};

export const PAGE_DATA = [
  {
    route: HOME_PAGE,
    title: 'OlyEats',
    showFavorite: false,
  },
  {
    route: ERROR_PAGE,
    tite: "You've Found an Error!",
    showFavorite: false,
  },
  {
    route: ADMIN_PAGE,
    title: 'OlyEats: Admin',
    showFavorite: false,
  },
  {
    route: RECIPE_PAGE,
    showFavorite: true,
  },
  {
    route: ADD_RECIPE_PAGE,
    title: 'New Recipe',
    showFavorite: false,
  },
  {
    route: EDIT_RECIPE_PAGE,
    title: 'Edit Recipe',
    showFavorite: false,
  },
];
