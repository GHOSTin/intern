import { Meteor } from 'meteor/meteor';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {lightBlue300, white} from 'material-ui/styles/colors';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';

import AuthPage from './AuthPage.jsx';

const styles = {
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  loginButton: {
    float: 'right'
  }
};

export default class SignInPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {} });
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.email.input.value;
    const password = this.password.input.value;
    const errors = {};

    if (!email) {
      errors.email = i18n.__('pages.authPageSignIn.emailRequired');
    }
    if (!password) {
      errors.password = i18n.__('pages.authPageSignIn.passwordRequired');
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      } else {
        this.context.router.push('/');
      }
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div className="wrapper-auth">
        <h1 className="title-auth">
          {i18n.__('pages.authPageSignIn.signIn')}
        </h1>
        <Paper style={styles.paper}>
          <form onSubmit={this.onSubmit}>
            <div className="list-errors">
              {errorMessages.map(msg => (
                <div className="list-item" key={msg}>{msg}</div>
              ))}
            </div>
            <TextField
              hintText={i18n.__('pages.authPageSignIn.yourEmail')}
              ref={(c) => { this.email = c; }}
              type='email'
              fullWidth={true}
              floatingLabelText={i18n.__('pages.authPageSignIn.yourEmail')}
            />
            <TextField
              hintText={i18n.__('pages.authPageSignIn.password')}
              type='password'
              ref={(c) => { this.password = c; }}
              fullWidth={true}
              floatingLabelText={i18n.__('pages.authPageSignIn.password')}
            />
            <div>
              <RaisedButton
                label={i18n.__('pages.authPageSignIn.signInButton')}
                backgroundColor={lightBlue300}
                labelColor={white}
                style={styles.loginButton}
                fullWidth={true}
                type="submit"
              />
            </div>
          </form>
        </Paper>
      </div>
    );

    return <AuthPage content={content} />;
  }
}

SignInPage.contextTypes = {
  router: React.PropTypes.object,
};
