import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Menu from 'material-ui/svg-icons/navigation/menu';
import LinearProgress from 'material-ui/LinearProgress';
import {white, blue500} from 'material-ui/styles/colors';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session'; // XXX: SESSION
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ConnectionNotification from '../components/ConnectionNotification.jsx';

import {Link} from 'react-router';

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
            isAuthenticated: Meteor.userId() !== null
        };
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        if (!this.state.isAuthenticated) {
            this.context.router.push('/signin');
        }
    }

    componentDidMount() {
        setTimeout(() => {
            /* eslint-disable react/no-did-mount-set-state */
            this.setState({showConnectionIssue: true});
        }, CONNECTION_ISSUE_TIMEOUT);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.width !== nextProps.width) {
            this.setState({
                navDrawerDocker: nextProps.width === LARGE,
                navDrawerOpen: nextProps.width === LARGE
            });
        }
        this.setState({
            isAuthenticated: Meteor.userId() !== null
        });
    }

    handleChangeRequestNavDrawer() {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    }

    onRequestChange(open, reason) {
        this.setState({
            navDrawerOpen: open
        });
    }

    logout(e) {
        e.preventDefault();
        Meteor.logout((err) => {
            if (err) {
                console.log( err.reason );
            } else {
                this.setState({
                    isAuthenticated: false
                });
                this.context.router.push('/signin')
            }
        });
    }

    render() {
        const {showConnectionIssue, navDrawerOpen, isAuthenticated} = this.state;
        const {
            user,
            connected,
            loading,
            children,
            location,
        } = this.props;
        const paddingLeftDrawerOpen = 270;


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
                paddingLeft: navDrawerOpen && isAuthenticated  && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
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

        const Logged = (props) => (
            <IconMenu
                {...props}
                iconButtonElement={
                    <IconButton><MoreVertIcon color={white} /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Выход" onTouchTap={this.logout.bind(this)} />
            </IconMenu>
        );

        return (
            <MuiThemeProvider>
                <div>
                    {loading ?
                        <LinearProgress mode="indeterminate" color={blue500} style={styles.loadingStyle}/> : null}
                    <AppBar
                        style={styles.appBar}
                        iconElementLeft={
                            <IconButton
                                style={styles.menuButton}
                                onClick={this.state.isAuthenticated ? this.handleChangeRequestNavDrawer.bind(this) : null}
                            >
                                <Menu color={white}/>
                            </IconButton>
                        }
                        iconElementRight={
                            this.state.isAuthenticated ? <Logged /> : null
                        }
                    >
                        {showConnectionIssue && !connected
                            ? <ConnectionNotification/>
                            : null}
                    </AppBar>
                    {this.state.isAuthenticated ?
                    <Drawer
                        docked={this.state.navDrawerDocker}
                        open={this.state.navDrawerOpen}
                        containerStyle={styles.navStyle}
                        onRequestChange={this.onRequestChange.bind(this)}
                        width={paddingLeftDrawerOpen}
                    >
                        <MenuItem leftIcon={<PersonAdd/>}>
                            <Link
                                to={`/interns/`}
                                title="Список стажеров"
                                className="list-todo"
                                activeClassName="active"
                            >
                                Список стажеров
                            </Link>
                        </MenuItem>
                        <MenuItem leftIcon={<ContentCopy/>}>Отчеты</MenuItem>
                    </Drawer> : null}
                    <div style={styles.container}>
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                        >
                            {!loading ? clonedChildren : null}
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
