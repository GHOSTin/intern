import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Departments } from '../../api/departments/departments';
import DirectionAutoComplete from '../components/DirectionAutoComplete';

export default AutoCompleteContainer = createContainer(() => {
    //const departmentsHandle = Meteor.subscribe('departments.directions');
    //const loading = !departmentsHandle.ready();
    //const departments = Departments.find();
    //const listExists = !loading && !!departments;
    //console.log(label);
    return {
        //loading,
        //listExists,
        //data: listExists ? departments.fetch() : [],
        label:"111"
    };
}, DirectionAutoComplete);
