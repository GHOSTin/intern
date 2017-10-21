import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Interns } from '../../api/interns/interns.js';
import InternsPage from '../pages/InternsPage';

const InternsPageContainer = withTracker( props => {
    const internsHandler = Meteor.subscribe('interns.list');
    const presentations = Meteor.subscribe('interns.presentations');
    const loading = !internsHandler.ready();
    const interns = Interns.find({},{sort : { lastname : 1}});
    const listExists = !loading && !!interns;
    return {
        loading,
        listExists: true,
        interns: listExists ? interns.fetch() : [],
        presentations
    };
})(InternsPage);

export default InternsPageContainer;
