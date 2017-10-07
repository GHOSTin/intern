import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import {Interns} from './interns'

const InternSchema = new SimpleSchema([new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
}), Interns.schema]);


export const update = new ValidatedMethod({
    name: 'intern.update',
    validate:new SimpleSchema({
        intern: {
            type: InternSchema,
        }
    }).validator(),
    run({ intern }) {
        intern = _.omit(intern, "createdAt");
        Interns.update({_id: intern._id}, {$set: intern});
    },
});


export const insert = new ValidatedMethod({
    name: 'intern.insert',
    validate: new SimpleSchema({
        intern: {
            type: Interns.schema.omit('createdAt')
        }
    }).validator(),
    run({ intern }) {
        Interns.insert(intern);
    },
});

