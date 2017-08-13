import {Meteor} from 'meteor/meteor';

import {Departments} from '../departments';

Meteor.publish('departments.directions', ()=>{
   return Departments.find({
       parent_id: ""
   }, {
       fields: Departments.publicFields,
   });
});

Meteor.publish('departments.departments', (id)=>{
    check(id, Match.Any);
    return Departments.find({
        parent_id: id
    }, {
        fields: Departments.publicFields,
    });
});