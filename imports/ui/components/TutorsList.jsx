import React from "react";
import moment from 'moment';
import 'moment/locale/ru';
import BaseComponent from '../components/BaseComponent.jsx';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import SocialPerson from 'material-ui/svg-icons/social/person';
import {blue500, blueGrey400} from 'material-ui/styles/colors';

const styles = {
  content: {
    width: 400,
    maxWidth: 400
  }
};


export default class TutorsList extends BaseComponent {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  constructor(props) {
    super(props);
  }

  render(){
    const actions = [
      <FlatButton
        label="Закрыть"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    const TutorsList = this.props.tutors.map((e, index, list)=>{
      let backgroundColor = index === list.length - 1 ? blue500 : blueGrey400;
      return (
        <ListItem
          leftAvatar={<Avatar icon={<SocialPerson/>} backgroundColor={backgroundColor}/>}
          primaryText={e.name}
          secondaryText={moment(e.date).format("DD MMMM Y")}
          key={index}
        />
      )
    });

    return (
      <div>
        <FlatButton label="История" fullWidth={true} style={{marginTop: 15}} onClick={this.handleOpen}/>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          contentStyle={styles.content}
        >
          <List>
            <Subheader>Наставники</Subheader>
            {TutorsList}
          </List>
        </Dialog>
      </div>
    )
  }
}