import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import i18n from 'meteor/universe:i18n';

class InternsCollection extends Mongo.Collection {
    insert(intern, callback, locale = 'ru') {
        const ourIntern = intern;
        if (!ourIntern.name) {
            const defaultName = i18n.__(
                'api.lists.insert.list',
                null,
                { _locale: locale }
            );
            let nextLetter = 'А';
            ourIntern.name = `${defaultName} ${nextLetter}`;

            while (this.findOne({ name: ourIntern.name })) {
                // not going to be too smart here, can go past Z
                nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
                ourIntern.name = `${defaultName} ${nextLetter}`;
            }
        }

        return super.insert(ourIntern, callback);
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
    name: { type: String },
    incompleteCount: { type: Number, defaultValue: 0 },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

Interns.attachSchema(Interns.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Interns.publicFields = {
    name: 1,
    incompleteCount: 1,
    userId: 1,
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