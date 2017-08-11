import {Mongo} from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';

export const Departments = new Mongo.Collection('departments');

// Deny all client-side updates since we will be using methods to manage this collection
Departments.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Departments.schema = new SimpleSchema({
    name: { type: String },
    parent_id: { type: String, defaultValue: "" },
    org_name: { type: String, optional: true },
});

Departments.attachSchema(Departments.schema);

Departments.publicFields = {
    name: 1,
    parent_id: 1,
};

Factory.define('department', Departments, {});