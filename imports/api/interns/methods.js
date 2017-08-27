import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import {Interns} from './interns'

export const insert = new ValidatedMethod({
    name: 'intern.insert',
    validate: new SimpleSchema({
        "intern.firstname": {
            type: String,
            optional: true
        },
        "intern.lastname": {
            type: String,
            optional: true
        },
        "intern.middlename": {
            type: String,
            optional: true
        },
        "intern.birthday": {
            type: Match.OneOf(null, Date),
            optional: true
        },
        "intern.educations": {
            type: Array,
            optional: true
        },
        "intern.educations.$": {
            type: Object,
            optional: true
        },
        "intern.stages": {
            type: Array,
            optional: true
        },
        "intern.stages.$": {
            type: Object,
            optional: true
        },
        "intern.activities": {
            type: Array,
            optional: true
        },
        "intern.activities.$": {
            type: Object,
            optional: true
        },
        "intern.internships": {
            type: Array,
            optional: true
        },
        "intern.internships.$": {
            type: Object,
            optional: true
        },
        "intern.direction": {
            type: Match.OneOf(String, Object),
            optional: true
        },
        "intern.department": {
            type: Match.OneOf(String, Object),
            optional: true
        },
        "intern.group": {
            type: Match.OneOf(String, Object),
            optional: true
        },
        "intern.gender": {
            type: String,
            optional: true
        },
        "intern.army": {
            type: Boolean,
            optional: true
        },
    }).validator(),
    run({ intern }) {
        Interns.insert(intern);
    },
});

