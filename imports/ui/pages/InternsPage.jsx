import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import InternDialog from '../components/InternDialog.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {lightBlue300} from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ContentCreate from 'material-ui/svg-icons/content/create';
import DataTables from 'material-ui-datatables';
import get from 'lodash/get';

const styles = {
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    table:{
        avatar: {
            width: 60
        },
        edit: {
            width: 100
        }
    }
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

    handleRequestSort = (property, order) => {
        const orderBy = property;

        let data;
            switch(orderBy) {
                case 'stages':
                    data =
                        order ===
                        'desc'
                            ? this.props.interns.sort((a, b) => (b[orderBy].length < a[orderBy].length ? -1 : 1))
                            : this.props.interns.sort((a, b) => (a[orderBy].length < b[orderBy].length ? -1 : 1));
                    break;
                default:
                    data =
                        order ===
                            'desc'
                                ? this.props.interns.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                                : this.props.interns.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
            }

        this.setState({ data, order, orderBy });
    };

    handleFilterValueChange(...args) {
        // eslint-disable-next-line no-console
        let filterValue = get(args, '[0]', null);
        if (filterValue) {
            filterValue = filterValue.toLowerCase();
        }
        const newState = Object.assign({}, this.state, { filterValue });
        this.setState(newState);
    }

  render() {
    const { loading, listExists, interns } = this.props;

    const TABLE_COLUMNS = [
        {
            key: 'avatar',
            label: '',
            sortable: false,
            style: styles.table.avatar,
            render: (name, all) => <Avatar src={name}/>
        },
        {
            key: 'lastname',
            label: 'ФИО',
            sortable: true,
            render: (name, all) => <p>{name} {all.firstname} {all.middlename}</p>
        },
        {
            key: 'stages',
            label: '№ этапа стажировки',
            sortable: true,
            render: (stages, all) => <p>{stages.length}</p>
        },
        {
            key: 'edit',
            alignRight: true,
            style: styles.table.edit,
            render: (item, intern) => <IconButton
                tooltip="Изменить"
                tooltipPosition='top-center'
                onClick={() => this.onEditingChange(intern, true)}
            >
                <ContentCreate/>
            </IconButton>
        }
    ];

      if (!listExists) {
      return <NotFoundPage />;
    }

      let filteredItems = interns;

      // Filter to select only the items that pass our seach, but only in the selected columns
      if (this.state.filterValue) {
          filteredItems = filteredItems.filter((item) => {
                  return get(item, 'lastname', '').toString().toLowerCase().includes(this.state.filterValue);
          });
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
            <DataTables
                title={"Список стажеров"}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                showHeaderToolbar={true}
                columns={TABLE_COLUMNS}
                data={filteredItems}
                showCheckboxes={false}
                onFilterValueChange={this.handleFilterValueChange.bind(this)}
                onSortOrderChange={this.handleRequestSort.bind(this)}
                initialSort={{column: 'lastname', order: 'asc'}}
                page={1}
                count={100}
                rowSizeLabel={i18n.__('components.Table.rowSize')}
                summaryLabelTemplate={(start, end, count) => {
                    return `${start} - ${end} из ${count}`;
                }}
                filterHintText={i18n.__('components.Table.Search')}
            />
        );
    }

    return (
      <div className="page lists-show">
        <div className="content-scrollable list-items">
          {loading
            ? <Message title={i18n.__('pages.InternsPage.loading')} />
            : Interns}
        </div>
          <FloatingActionButton
              backgroundColor={lightBlue300}
              onTouchTap={() => this.onEditingChange({}, false)}
              style={styles.floatingActionButton}
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
