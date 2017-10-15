import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Menu from 'material-ui/svg-icons/navigation/menu';
import LinearProgress from 'material-ui/LinearProgress';
import {white, blue500} from 'material-ui/styles/colors';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Lists } from '../../api/lists/lists.js';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

import { Link } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const CONNECTION_ISSUE_TIMEOUT = 5000;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerDocker: props.width === LARGE,
      navDrawerOpen: props.width === LARGE,
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

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
        this.setState({
            navDrawerDocker: nextProps.width === LARGE,
            navDrawerOpen: nextProps.width === LARGE
        });
    }
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  handleChangeRequestNavDrawer() {
    this.setState({
        navDrawerOpen: !this.state.navDrawerOpen
    });
  }

    onRequestChange(open, reason){
        this.setState({
            navDrawerOpen: open
        });
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
    const { showConnectionIssue, navDrawerOpen } = this.state;
    const {
      user,
      connected,
      loading,
      lists,
      menuOpen,
      children,
      location,
    } = this.props;
    const paddingLeftDrawerOpen = 270;

    // eslint-disable-next-line react/jsx-no-bind
    const closeMenu = this.toggleMenu.bind(this, false);

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    const styles = {
        header: {
            paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
        },
        container: {
            margin: '80px 20px 20px 15px',
            paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
        },
        navStyle: {
            marginTop: 57,
        },
        menuButton: {
            marginLeft: 10
        },
        appBar: {
            position: 'fixed',
            top: 0,
            overflow: 'hidden',
            maxHeight: 57,
            zIndex: 1400
        },
        loadingStyle: {
            zIndex: 1500
        }
    };

    return (
    <MuiThemeProvider>
      <div>
        {loading?<LinearProgress mode="indeterminate" color={blue500} style={styles.loadingStyle} />:null}
        <AppBar
            style={styles.appBar}
            iconElementLeft={
              <IconButton style={styles.menuButton} onClick={this.handleChangeRequestNavDrawer.bind(this)}>
                <Menu color={white} />
              </IconButton>
            }
        >
            {showConnectionIssue && !connected
                ? <ConnectionNotification />
                : null}
        </AppBar>
        <Drawer
            docked={this.state.navDrawerDocker}
            open={this.state.navDrawerOpen}
            containerStyle={styles.navStyle}
            onRequestChange={this.onRequestChange.bind(this)}
            width={paddingLeftDrawerOpen}
        >
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
        <div style={styles.container}>
          <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={200}
          >
              {!loading?clonedChildren:null}
          </ReactCSSTransitionGroup>
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

export default withWidth()(App);
