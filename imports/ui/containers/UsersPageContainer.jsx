import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import UsersPage from '../pages/UsersPage.jsx';

const UsersPageContainer = withTracker(props => {
  const usersHandle = Meteor.subscribe('users.public');
  const loading = !usersHandle.ready();
  const users = Meteor.users.find({});
  const listExists = !loading && !!users;
  return {
    loading,
    listExists,
    users: listExists ? users.fetch() : [],
  };
})(UsersPage);

export default UsersPageContainer;
