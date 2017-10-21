import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Interns } from '/imports/api/interns/interns';
import App from '../layouts/App.jsx';

export default withTracker(props => {
  const privateHandle = Meteor.subscribe('interns.list');
  const userHandle = Meteor.subscribe('userData');
  return {
    loading: !privateHandle.ready() || !userHandle.ready(),
    user: Meteor.user(),
    connected: Meteor.status().connected,
    interns: Interns.find({}).fetch(),
  };
})(App);
