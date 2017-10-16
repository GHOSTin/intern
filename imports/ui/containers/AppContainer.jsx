import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import { Interns } from '/imports/api/interns/interns';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const privateHandle = Meteor.subscribe('interns.list');
  return {
    user: Meteor.user(),
    loading: !privateHandle.ready(),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    interns: Interns.find({}).fetch(),
  };
}, App);
