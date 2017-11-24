import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import i18n from 'meteor/universe:i18n';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import InternsPageContainer from '../../ui/containers/InternsPageContainer.jsx';
import ReportsPageContainer from '../../ui/containers/ReportsPageContainer.jsx';
import UsersPageContainer from '../../ui/containers/UsersPageContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

i18n.setLocale('ru');

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="interns" component={InternsPageContainer} />
      <Route path="reports" component={ReportsPageContainer} />
      <Route path="users" component={UsersPageContainer} />
      <Route path="signin" component={AuthPageSignIn} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
