import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';

class InternsCollection extends Mongo.Collection {
    insert(intern, callback, locale = 'ru') {
        return super.insert(intern, callback);
    }
    update(selector, modifier, callback) {
        return super.update(selector, modifier, {multi: true}, callback);
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
        type: [Object],
        optional: true
    },
    "educations.$.university": {
        type: String,
        optional: true
    },
    "educations.$.speciality": {
        type: String,
        optional: true
    },
    "educations.$.theme": {
        type: String,
        optional: true
    },
    "educations.$.startYear": {
        type: Date,
        optional: true
    },
    "educations.$.endYear": {
        type: Date,
        optional: true
    },
    "educations.$.department": {
        type: String,
        optional: true
    },
    "educations.$.course": {
        type: String,
        optional: true
    },
    stages: {
        type: [Object],
        optional: true
    },
    "stages.$.startDate": {
        type: Date,
        optional: true
    },
    "stages.$.endDate": {
        type: Date,
        optional: true
    },
    "stages.$.theme": {
        type: String,
        optional: true
    },
    "stages.$.defendDate": {
        type: Date,
        optional: true
    },
    "stages.$.result": {
        type: String,
        optional: true
    },
    "stages.$.presentation": {
        type: String,
        optional: true
    },
    activities: {
        type: [Object],
        optional: true
    },
    "activities.$.type": {
        type: SimpleSchema.Integer,
        optional: true
    },
    "activities.$.typeName": {
        type: String,
        optional: true
    },
    "activities.$.name": {
        type: String,
        optional: true
    },
    "activities.$.date": {
        type: Date,
        optional: true
    },
    "activities.$.trainer": {
        type: String,
        optional: true
    },
    internships: {
        type: [Object],
        optional: true
    },
    "internships.$.place": {
        type: String,
        optional: true
    },
    "internships.$.tutor": {
        type: String,
        optional: true
    },
    "internships.$.startDate": {
        type: Date,
        optional: true
    },
    "internships.$.endDate": {
        type: Date,
        optional: true
    },
    direction: {
        type: Match.OneOf(String, Object),
        optional: true
    },
    "direction.id": {
        type: Number
    },
    "direction.name": {
        type: String
    },
    department: {
        type: Match.OneOf(String, Object),
        optional: true
    },
    "department._id": {
        type: Number
    },
    "department.name": {
        type: String
    },
    group: {
        type: Match.OneOf(String, Object),
        optional: true
    },
    "group._id": {
        type: Number
    },
    "group.name": {
        type: String
    },
    gender: {
        type: String,
        optional: true
    },
    army: {
        type: Boolean,
        optional: true
    },
    tabel: {
        type: SimpleSchema.Integer,
        optional: true
    },
    enterDate: {
        type: Date,
        optional: true
    },
    position: {
        type: String,
        optional: true
    },
    employmentDate: {
        type: Date,
        optional: true
    },
    dismissalDate: {
        type: Date,
        optional: true
    },
    tutor: {
        type: String,
        optional: true
    },
    startSUDate: {
        type: Date,
        optional: true
    },
    endSUDate: {
        type: Date,
        optional: true
    },
    avatar: {
        type: String,
        optional: true,
        defaultValue: "/default-userAvatar.png"
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
        autoValue: function() {
            if ( this.isInsert ) {
                return new Date;
            }
        }
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