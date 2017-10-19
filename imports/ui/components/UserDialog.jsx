import React from "react";
import BaseComponent from '../components/BaseComponent.jsx';
import DepartmentAutoCompleteContainer from '/imports/ui/components/DepartmentAutoComplete';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {grey400, grey50} from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Upload from 'material-ui-upload/Upload';
import {AvatarCropper, FileUpload} from './ImageUploader.jsx';

import {Row, Col} from 'react-flexbox-grid';

import {insert, update} from '/imports/api/interns/methods'
import { displayError } from '../helpers/errors.js';

let DateTimeFormat;

const IntlPolyfill = require('intl');
DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/ru-RU');

const styles = {
  titleStyle: {
    background: grey50
  },
  avatarPhoto: {
    "position": "relative",
    "width": 60,
    float: "left",
  },
  avatarOverlay: {
    width: 50,
    height: 50,
    top: 5,
    left: 5,
    lineHeight: "60px"
  },
  avatarOverlayIcon: {
    "fontSize": 24,
  },
  avatar: {boxShadow: "0 0 1px 6px #e8e8e8"},
  dialogTitle: {
    height: 30,
    margin: "15px 80px"
  }
};

export default class UserDialog extends BaseComponent {
    state = {
        user: {
            username: "",
            emails: [],
            createdAt: null,
            avatar: "/default-userAvatar.png",
        },
        cropperOpen: false,
        img: null,
        verified: true
    };

    constructor(props) {
        super(props);
        this.state = Object.assign(this.state, {
            editing: props.editing,
            user: props.user
        });
        this.handleSave = this.handleSave.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            editing: props.editing,
            user: props.user
        })
    }

    changeHandlerVal(key, attr, value) {
        let state = {};
        if (key !== null) {
            state[key] = this.state[key] || {};
            state[key][attr] = value;
        } else {
            state[attr] = value;
        }
        state.lastChange = new Date().now; // ms
        this.setState(state);
    };

    changeHandler = function(key, attr, event) {
      if(event.currentTarget.name === 'password' || event.currentTarget.name === 'passwordConfirm') {
        console.log(event.currentTarget);
      }
        this.changeHandlerVal(key, attr, event.currentTarget.value);
    };

    changeHandlerTabVal = (key, attr, index, value) => {
        const items = this.state.intern[key].slice();
        items[index][attr] = value;

        this.changeHandlerVal('intern', key, items);
    };

    handleSave(e){
        e.preventDefault();
        console.log(this.state.user);
        if(this.state.editing){
            update.call({intern: this.state.intern}, displayError)
        } else {
            insert.call({intern: this.state.intern}, displayError)
        }
        this.props.onHide()
    };

    handleFileChange(dataURI) {
        this.changeHandlerVal(null, "img", dataURI);
        this.changeHandlerVal(null, "cropperOpen", true);
        this.changeHandlerVal("intern", "avatar", this.state.intern.avatar);
    };

    handleCrop(dataURI) {
        this.changeHandlerVal(null, "img", null);
        this.changeHandlerVal(null, "cropperOpen", false);
        this.changeHandlerVal("intern", "avatar", dataURI);
    };
    handleRequestHide() {
        this.setState({
            cropperOpen: false
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="Отмена"
                primary={false}
                keyboardFocused={false}
                onTouchTap={this.props.onHide}
            />,
            <FlatButton
                label="Сохранить"
                primary={true}
                keyboardFocused={false}
                onTouchTap={this.handleSave}
            />,
        ];

        let {user} = this.state;

        const UserDialogTitle = (<div>
            <div className="avatar-photo"
                 style={styles.avatarPhoto}
            >
              <FileUpload
                handleFileChange={this.handleFileChange}
              />
              <div className="avatar-edit" style={styles.avatarOverlay}>
                <FontIcon
                  className="material-icons"
                  style={styles.avatarOverlayIcon}
                  color={"rgba(255,255,255,.8)"}
                >
                  photo_camera
                </FontIcon>
              </div>
              <Avatar size={60} src={user.avatar} style={styles.avatar}/>
            </div>
            <div style={styles.dialogTitle}>
              {this.state.editing?"Изменить пользователя":"Новый пользователь"}
            </div>
            {this.state.cropperOpen &&
            <AvatarCropper
              onRequestHide={this.handleRequestHide.bind(this)}
              cropperOpen={this.state.cropperOpen}
              onCrop={this.handleCrop.bind(this)}
              image={this.state.img}
              width={300}
              height={300}
            />
            }
          </div>);
        return (
            <div>
                <Dialog
                    title={
                      UserDialogTitle
                    }
                    titleStyle={styles.titleStyle}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onHide}
                    autoScrollBodyContent={true}
                >
                    <h2 className="m-t">Общая информация</h2>
                    <Row>
                        <Col xs={12} md={12}>
                            <TextField
                                name="username"
                                fullWidth={true}
                                floatingLabelText="ФИО"
                                value={user.username}
                                onChange={this.changeHandler.bind(this, 'user', 'username')}
                            />
                            <TextField
                                name="email"
                                fullWidth={true}
                                floatingLabelText="E-mail"
                                type='email'
                                value={user.emails[0]?user.emails[0].address:""}
                                onChange={this.changeHandler.bind(this, 'user', 'email')}
                            />
                            <TextField
                                name="password"
                                fullWidth={true}
                                floatingLabelText="Пароль"
                                type='password'
                                ref = {(e)=>{this.password = e.value}}
                                value={user.password}
                                onChange={this.changeHandler.bind(this, 'user', 'password')}
                            />
                            <TextField
                              name="passwordConfirm"
                              fullWidth={true}
                              floatingLabelText="Повтор пароля"
                              type='password'
                              ref = {(e)=>{this.passwordConfirm = e.value}}
                              value={user.passwordConfirm}
                              onChange={this.changeHandler.bind(this, 'user', 'passwordConfirm')}
                            />
                        </Col>
                        <Divider />
                    </Row>
                </Dialog>
            </div>
        )
    }
}

/*InternDialog.propTypes = {
    open: React.PropTypes.bool,
    onHide: React.PropTypes.func.isRequired,
    intern:  React.PropTypes.objectOf(React.PropTypes.shape({
        firstname: React.PropTypes.any,
        lastname: React.PropTypes.any,
        middlename: React.PropTypes.any,
        direction: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        department: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        group: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    }))
};*/

UserDialog.defaultProps = {
  user: {
    username: "",
    emails: [],
    createdAt: null,
    avatar: "/default-userAvatar.png",
  }
};