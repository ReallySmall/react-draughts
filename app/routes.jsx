import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from 'containers/App';
import HomepageContainer from 'containers/HomepageContainer';
import CookiesContainer from 'containers/CookiesContainer';
import NotFoundContainer from 'containers/NotFoundContainer';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomepageContainer} />
      <Route path="cookies" component={CookiesContainer} />
      <Route path='*' component={NotFoundContainer} status={404} />
    </Route>
  );
};
