import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Interns } from '/imports/api/interns/interns';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const privateHandle = Meteor.subscribe('interns.list');
  return {
    user: Meteor.user(),
    loading: !privateHandle.ready(),
    connected: Meteor.status().connected,
    interns: Interns.find({}).fetch(),
  };
}, App);
