import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import InternDialog from '../components/InternDialog.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {lightBlue300} from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ContentCreate from 'material-ui/svg-icons/content/create';

const style = {
    position: "absolute",
    right: 10,
    bottom: 10
};

export default class InternsPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { editing: undefined, open: false });
    this.onEditingChange = this.onEditingChange.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
  }

  onEditingChange(intern, editing) {
    this.setState({
        intern: editing ? intern : undefined,
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
    const { loading, listExists, interns } = this.props;

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

    let Interns;
    if (!interns || !interns.length) {
        Interns = (
        <Message
          title={i18n.__('pages.InternsPage.noInterns')}
          subtitle={i18n.__('pages.InternsPage.addAbove')}
        />
      );
    } else {
        Interns = (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn style={{width: 68}}/>
                        <TableHeaderColumn>ФИО</TableHeaderColumn>
                        <TableHeaderColumn>№ этапа</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 100}}/>
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} displayRowCheckbox={true}>
                    {interns.map((intern,index) => (
                        <TableRow key={intern._id}>
                            <TableRowColumn style={{width: 68}}><Avatar src={intern.avatar}/></TableRowColumn>
                            <TableRowColumn>
                                {intern.lastname} {intern.firstname} {intern.middlename}
                            </TableRowColumn>
                            <TableRowColumn>{intern.stages.length}</TableRowColumn>
                            <TableRowColumn style={{overflow: 'visible', width: 100}}>
                                <IconButton
                                    tooltip="Изменить"
                                    tooltipPosition='top-center'
                                    onClick={() => this.onEditingChange(intern, true)}
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
        <nav className="list-header">
            <MobileMenu />
        </nav>
        <div className="content-scrollable list-items">
          {loading
            ? <Message title={i18n.__('pages.InternsPage.loading')} />
            : Interns}
        </div>
          <FloatingActionButton
              backgroundColor={lightBlue300}
              onTouchTap={() => this.onEditingChange({}, false)}
              style={style}
          >
            <ContentAdd/>
          </FloatingActionButton>
          <InternDialog
              open={this.state.open}
              onHide={this.onHideModal}
              intern={this.state.intern}
              editing={this.state.editing}
          />
      </div>
    );
  }
}

InternsPage.propTypes = {
  loading: React.PropTypes.bool,
  listExists: React.PropTypes.bool,
  interns: React.PropTypes.array,
  presentations: React.PropTypes.object
};
