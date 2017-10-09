/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Interns } from '../interns.js';

Meteor.publish('interns.public', function listsPublic() {
  return Interns.find({
    userId: { $exists: false },
  }, {
    fields: Interns.publicFields,
  });
});

Meteor.publish('interns.private', function listsPrivate() {
  if (!this.userId) {
    return this.ready();
  }

  return Interns.find({
    userId: this.userId,
  }, {
    fields: Interns.publicFields,
  });
});

Meteor.publish('interns.list', function list() {
  return Interns.find({}, {$sort: {"createdAt": 1}});
});
