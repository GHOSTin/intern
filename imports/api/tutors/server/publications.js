import { Meteor } from 'meteor/meteor';
import {Tutors} from '/imports/api/tutors/tutors';

Meteor.publish('tutors.list', function listTutorsPublic(internId) {
  check(internId, String);
  return Tutors.find({internId})
});