import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
});

const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(
  reducer
);
export default store;
