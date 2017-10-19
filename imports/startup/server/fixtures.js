import { Meteor } from 'meteor/meteor';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if(Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'admin',
      email: '1@1.ru',
      password: 'Aa123456'
    });
  }
});
