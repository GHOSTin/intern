import {Meteor} from 'meteor/meteor';

import {Departments} from '../departments';

Meteor.publish('departments.directions', ()=>{
   return Departments.find({parent_id: ""});
});