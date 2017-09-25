import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';

class InternsCollection extends Mongo.Collection {
    insert(intern, callback, locale = 'ru') {
        const ourIntern = intern;
        ourIntern.createdAt = ourIntern.createdAt || new Date();
        return super.insert(ourIntern, callback);
    }
    update(selector, modifier) {
        return super.update(selector, modifier, {$multi: true, upsert: true});
    }
    remove(selector, callback) {
        return super.remove(selector, callback);
    }
}

export const Interns = new InternsCollection('interns');

// Deny all client-side updates since we will be using methods to manage this collection
Interns.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Interns.schema = new SimpleSchema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    middlename: {
        type: String,
        optional: true
    },
    birthday: {
        type: Match.OneOf(null, Date),
    },
    educations: {
        type: Array,
        optional: true
    },
    "educations.$": {
        type: Object,
    },
    stages: {
        type: Array,
        optional: true
    },
    "stages.$": {
        type: Object,
    },
    activities: {
        type: Array,
        optional: true
    },
    "activities.$": {
        type: Object,
    },
    internships: {
        type: Array,
        optional: true
    },
    "internships.$": {
        type: Object,
    },
    direction: {
        type: Match.OneOf(String, Object),
        optional: true
    },
    department: {
        type: Match.OneOf(String, Object),
        optional: true
    },
    group: {
        type: Match.OneOf(String, Object),
        optional: true
    },
    gender: {
        type: String,
        optional: true
    },
    army: {
        type: Boolean,
        optional: true
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
        optional: true
    },
});

Interns.attachSchema(Interns.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Interns.publicFields = {
};

Factory.define('intern', Interns, {});

Interns.helpers({
    // A list is considered to be private if it has a userId set
    isPrivate() {
        return !!this.userId;
    },
    isLastPublicList() {
        const publicListCount = Interns.find({ userId: { $exists: false } }).count();
        return !this.isPrivate() && publicListCount === 1;
    },
    editableBy(userId) {
        if (!this.userId) {
            return true;
        }

        return this.userId === userId;
    },
});