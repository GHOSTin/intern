import { Meteor } from 'meteor/meteor';

Meteor.publish('users.public', function usersPublic() {
  return Meteor.users.find({}, {
    fields: {
      services: 0
    },
  });
});
