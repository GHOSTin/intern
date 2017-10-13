
import { Meteor } from 'meteor/meteor';

import { Presentation } from '../common.js';

Meteor.publish('interns.presentations', function listsPublic() {
    return Presentation.find({});
});