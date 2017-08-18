import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import InternTableItem from '../components/InternTableItem';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import InternDialog from '../components/InternDialog.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {lightBlue300} from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

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
    this.onShowingModal = this.onShowingModal.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
  }

  onEditingChange(intern, editing) {
    this.setState({
        editing: editing ? intern : undefined,
        open: true
    });
  }

  onShowingModal() {
      this.onEditingChange(null, false);
  }

  onHideModal() {
      this.setState({
          open: false
      });
  }

  render() {
    const { loading, listExists, interns } = this.props;
    const { editingTodo } = this.state;

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
                        <TableHeaderColumn>#</TableHeaderColumn>
                        <TableHeaderColumn>ФИО</TableHeaderColumn>
                        <TableHeaderColumn>Text</TableHeaderColumn>
                        <TableHeaderColumn> </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true}>
                    {interns.map((intern,index) => (
                        <InternTableItem
                            intern={intern}
                            key={intern._id}
                            index={index}
                            onEditingChange={this.onEditingChange}
                        />
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
            ? <Message title={i18n.__('pages.listPage.loading')} />
            : Interns}
        </div>
          <FloatingActionButton
              backgroundColor={lightBlue300}
              onTouchTap={this.onShowingModal}
              style={style}
          >
            <ContentAdd/>
          </FloatingActionButton>
          <InternDialog open={this.state.open} onHide={this.onHideModal} intern={this.state.editing}/>
      </div>
    );
  }
}

InternsPage.propTypes = {
  loading: React.PropTypes.bool,
  listExists: React.PropTypes.bool,
  interns: React.PropTypes.array,
};
