import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';

class TutorCollection extends Mongo.Collection {
  insert(tutor, callback, locale = 'ru') {
    return super.insert(tutor, callback);
  }
  update(selector, modifier, callback) {
    return super.update(selector, modifier, {multi: true}, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const Tutors = new TutorCollection('tutors');

Tutors.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Tutors.schema = new SimpleSchema({
  internId: {
    type: String
  },
  name: {
    type: String
  },
  date: {
    type: Date,
    optional: true,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()}
      }
    }
  }
});

Tutors.attachSchema(Tutors.schema);

Tutors.publicFields = {
};

Factory.define('tutor', Tutors, {});