import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Lists } from '../../api/lists/lists.js';
import UserMenu from '../components/UserMenu.jsx';
import MainMenu from '../components/MainMenu.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

import { Link } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const CONNECTION_ISSUE_TIMEOUT = 5000;

const navStyle = {
    marginTop: 64,
    height: (window.innerHeight - 64)
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  componentWillReceiveProps({ loading, children }) {
    // redirect / to a list once lists are ready
    if (!loading && !children) {
      const list = Lists.findOne();
      this.context.router.replace(`/lists/${list._id}`);
    }
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  logout() {
    Meteor.logout();

    // if we are on a private list, we'll need to go to a public one
    if (this.props.params.id) {
      const list = Lists.findOne(this.props.params.id);
      if (list.userId) {
        const publicList = Lists.findOne({ userId: { $exists: false } });
        this.context.router.push(`/lists/${publicList._id}`);
      }
    }
  }

  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      loading,
      lists,
      menuOpen,
      children,
      location,
    } = this.props;

    // eslint-disable-next-line react/jsx-no-bind
    const closeMenu = this.toggleMenu.bind(this, false);

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return (
    <MuiThemeProvider>
      <div>
        <AppBar
            title="Title"
        />
        <Drawer open={this.state.open} containerStyle={navStyle} zDepth={1} width={270}>
          <MenuItem leftIcon={<PersonAdd />}>
            <Link
              to={`/interns/`}
              title="Список стажеров"
              className="list-todo"
              activeClassName="active"
            >
                Список стажеров
            </Link>
          </MenuItem>
          <MenuItem leftIcon={<ContentCopy />}>Отчеты</MenuItem>
        </Drawer>
        <div className="wrapper">
          <div id="container page-wrapper" className={menuOpen ? 'menu-open gray-bg' : 'gray-bg'}>
            <section id="menu">
              <UserMenu user={user} logout={this.logout} />
              <MainMenu user={user} />
            </section>
              {showConnectionIssue && !connected
                  ? <ConnectionNotification />
                  : null}
            <div className="content-overlay" onClick={closeMenu} />
            <div id="content-container">
              <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={200}
              >
                  {loading
                      ? <Loading key="loading" />
                      : clonedChildren}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  lists: React.PropTypes.array,      // all lists visible to the current user
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};
