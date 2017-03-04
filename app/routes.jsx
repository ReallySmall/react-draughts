import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from 'containers/App';
import HomepageContainer from 'containers/HomepageContainer';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomepageContainer} />
    </Route>
  );
};
