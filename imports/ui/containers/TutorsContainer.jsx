import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import { Tutors } from '../../api/tutors/tutors';
import TutorsList from '../components/TutorsList';

const TutorsContainer = withTracker(props => {
  const tutorsHandle = Meteor.subscribe('tutors.list', props.intern);
  const loading = !tutorsHandle.ready();
  const tutors = Tutors.find({},{sort : { date : 1}});
  const listExists = !loading && !!tutors;
  return {
    loading,
    listExists,
    tutors: listExists ? tutors.fetch() : []
  }
})(TutorsList);

export default TutorsContainer;