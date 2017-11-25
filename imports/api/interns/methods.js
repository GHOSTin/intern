import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import {Interns} from './interns';
import {Tutors} from '../tutors/tutors';
import { _ } from 'lodash'

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
        let tutor = intern.tutor ? _.capitalize(intern.tutor.trim()) : "";
        if(Meteor.isServer) {
          let {name} = Tutors.findOne({internId: intern._id}, {sort: {date: -1}})||{name: null};
          if (tutor && tutor !== name) {
            Tutors.insert({internId: intern._id, name: tutor})
          }
        }
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
        let internId = Interns.insert(intern);
        let tutor = _.capitalize(intern.tutor.trim());
        if(tutor) {
            Tutors.insert({internId, name: tutor})
        }
    },
});

