/* global document */

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

import '/node_modules/materialize-css/dist/css/materialize.min.css';
import '/node_modules/materialize-css/dist/js/materialize.min';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});

