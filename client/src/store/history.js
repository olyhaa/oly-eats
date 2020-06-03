import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen((location, action) => {
  // reset scroll to top if we go to a new route
  // NOT triggered on back button navigation
  if (action === 'PUSH') {
    window.scrollTo(0, 0);
  }
});

export default history;
