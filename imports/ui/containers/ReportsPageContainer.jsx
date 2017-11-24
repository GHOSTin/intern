import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Interns } from '../../api/interns/interns.js';
import ReportsPage from '../pages/ReportsPage';

const ReportsPageContainer = withTracker( props => {
  const internsHandler = Meteor.subscribe('interns.list');
  const loading = !internsHandler.ready();
  const interns = Interns.find({},{sort : { lastname : 1}});
  const listExists = !loading && !!interns;
  return {
    loading,
    listExists: true,
    interns: listExists ? interns.fetch() : [],
  };
})(ReportsPage);

export default ReportsPageContainer;