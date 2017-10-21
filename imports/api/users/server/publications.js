import { Meteor } from 'meteor/meteor';

Meteor.publish('users.public', function usersPublic() {
  return Meteor.users.find({}, {
    fields: {
      services: 0
    },
  });
});

Meteor.publish('userData', function () {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId }, {
            fields: { services: 0 }
        });
    } else {
        this.ready();
    }
});
