import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import UserDialog from '../components/UserDialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {lightBlue300} from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ContentCreate from 'material-ui/svg-icons/content/create';

const styles = {
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    }
};

export default class UsersPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { editing: undefined, open: false });
    this.onEditingChange = this.onEditingChange.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
  }

  onEditingChange(user, editing) {
    console.log(user);
    this.setState({
        user: editing ? user : undefined,
        open: true,
        editing: editing
    });
  }

  onHideModal() {
      this.setState({
          open: false
      });
  }

  render() {
    const { loading, listExists, users } = this.props;

    const TABLE_COLUMNS = [
        {
            key: 'avatar',
            label: '',
            sortable: false,
        },
        {
            key: 'lastname',
            label: 'Фамилия',
            sortable: true,
        },
        {
            key: 'stages',
            label: '№ этапа стажировки',
            sortable: true,
            render: (stages, all) => <p>{stages.length}</p>
        }
    ];

      if (!listExists) {
      return <NotFoundPage />;
    }

    let Users;
    if (!users || !users.length) {
      Users = (
        <Message
          title={i18n.__('pages.InternsPage.noInterns')}
          subtitle={i18n.__('pages.InternsPage.addAbove')}
        />
      );
    } else {
      Users = (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn style={{width: 68}}/>
                        <TableHeaderColumn>ФИО</TableHeaderColumn>
                        <TableHeaderColumn>E-mail/Login</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 100}}/>
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} displayRowCheckbox={true}>
                    {users.map((user,index) => (
                        <TableRow key={user._id}>
                            <TableRowColumn style={{width: 68}}><Avatar src={user.avatar}/></TableRowColumn>
                            <TableRowColumn>
                                {user.username}
                            </TableRowColumn>
                            <TableRowColumn>{user.emails[0].address}</TableRowColumn>
                            <TableRowColumn style={{overflow: 'visible', width: 100}}>
                                <IconButton
                                    tooltip="Изменить"
                                    tooltipPosition='top-center'
                                    onClick={() => this.onEditingChange(user, true)}
                                >
                                    <ContentCreate/>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        );
    }

    return (
      <div className="page lists-show">
        <div className="content-scrollable list-items">
          {loading
            ? <Message title={i18n.__('pages.InternsPage.loading')} />
            : Users}
        </div>
          <FloatingActionButton
              backgroundColor={lightBlue300}
              onTouchTap={() => this.onEditingChange({}, false)}
              style={styles.floatingActionButton}
          >
            <ContentAdd/>
          </FloatingActionButton>
          <UserDialog
              open={this.state.open}
              onHide={this.onHideModal}
              user={this.state.user}
              editing={this.state.editing}
          />
      </div>
    );
  }
}

UsersPage.propTypes = {
  loading: React.PropTypes.bool,
  listExists: React.PropTypes.bool,
  users: React.PropTypes.array,
};
