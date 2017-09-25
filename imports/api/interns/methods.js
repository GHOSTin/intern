import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import {Interns} from './interns'

export const update = new ValidatedMethod({
    name: 'intern.update',
    validate: new SimpleSchema({
        "intern._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        "intern.firstname": {
            type: String,
        },
        "intern.lastname": {
            type: String,
        },
        "intern.middlename": {
            type: String,
            optional: true
        },
        "intern.birthday": {
            type: Match.OneOf(null, Date),
        },
        "intern.educations": {
            type: Array,
            optional: true
        },
        "intern.educations.$": {
            type: Object,
            optional: true,
            blackbox: true
        },
        "intern.stages": {
            type: Array,
            optional: true
        },
        "intern.stages.$": {
            type: Object,
            optional: true,
            blackbox: true
        },
        "intern.activities": {
            type: Array,
            optional: true
        },
        "intern.activities.$": {
            type: Object,
            optional: true,
            blackbox: true
        },
        "intern.internships": {
            type: Array,
            optional: true
        },
        "intern.internships.$": {
            type: Object,
            optional: true,
            blackbox: true
        },
        "intern.direction": {
            type: Match.OneOf(String, Object),
            optional: true,
            blackbox: true
        },
        "intern.direction._id": {
            type: Match.OneOf(String, Number),
            label: "",
            optional: true
        },
        "intern.direction.name": {
            type: String,
            label: "",
            optional: true
        },
        "intern.department": {
            type: Match.OneOf(String, Object),
            optional: true,
            blackbox: true
        },
        "intern.department._id": {
            type: Match.OneOf(String, Number),
            label: "",
            optional: true
        },
        "intern.department.name": {
            type: String,
            label: "",
            optional: true
        },
        "intern.group": {
            type: Match.OneOf(String, Object),
            optional: true,
            blackbox: true
        },
        "intern.group._id": {
            type: Match.OneOf(String, Number),
            label: "",
            optional: true
        },
        "intern.group.name": {
            type: String,
            label: "",
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
        "intern.createdAt": {
            type: Date,
            denyUpdate: true,
        },
    }).validator(),
    run({ intern }) {
        let param = _.omit(intern, 'createdAt');
        Interns.update(intern._id,{
            $set: {
                firstname: intern.firstname,
                lastname: intern.lastname,
                direction: intern.direction,
                birthday: intern.birthday,
            },
        });
    },
});

export const insert = new ValidatedMethod({
    name: 'intern.insert',
    validate: new SimpleSchema({
        "intern.firstname": {
            type: String,
        },
        "intern.lastname": {
            type: String,
        },
        "intern.middlename": {
            type: String,
            optional: true
        },
        "intern.birthday": {
            type: Match.OneOf(null, Date),
        },
        "intern.educations": {
            type: Array,
            optional: true
        },
        "intern.educations.$": {
            type: Object,
            optional: true,
            blackbox: true
        },
        "intern.stages": {
            type: Array,
            optional: true
        },
        "intern.stages.$": {
            type: Object,
            optional: true,
            blackbox: true
        },
        "intern.activities": {
            type: Array,
            optional: true
        },
        "intern.activities.$": {
            type: Object,
            optional: true,
            blackbox: true
        },
        "intern.internships": {
            type: Array,
            optional: true
        },
        "intern.internships.$": {
            type: Object,
            optional: true,
            blackbox: true
        },
        "intern.direction": {
            type: Match.OneOf(String, Object),
            optional: true,
            blackbox: true
        },
        "intern.direction._id": {
            type: Match.OneOf(String, Number),
            label: "",
            optional: true
        },
        "intern.direction.name": {
            type: String,
            label: "",
            optional: true
        },
        "intern.department": {
            type: Match.OneOf(String, Object),
            optional: true,
            blackbox: true
        },
        "intern.department._id": {
            type: Match.OneOf(String, Number),
            label: "",
            optional: true
        },
        "intern.department.name": {
            type: String,
            label: "",
            optional: true
        },
        "intern.group": {
            type: Match.OneOf(String, Object),
            optional: true,
            blackbox: true
        },
        "intern.group._id": {
            type: Match.OneOf(String, Number),
            label: "",
            optional: true
        },
        "intern.group.name": {
            type: String,
            label: "",
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

