/* global document */

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

//import '/node_modules/materialize-css/dist/css/materialize.min.css';
//import '/node_modules/materialize-css/dist/js/materialize.min';
import 'react-flexbox-grid/lib/index.css'

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});

