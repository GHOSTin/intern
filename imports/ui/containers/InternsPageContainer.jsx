import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Interns } from '../../api/interns/interns.js';
import InternsPage from '../pages/InternsPage';

const InternsPageContainer = createContainer(() => {
    const internsHandler = Meteor.subscribe('interns.list');
    const loading = !internsHandler.ready();
    const interns = Interns.find({});
    const listExists = !loading && !!interns;
    return {
        loading,
        listExists: true,
        interns: listExists ? interns.fetch() : [],
    };
}, InternsPage);

export default InternsPageContainer;
