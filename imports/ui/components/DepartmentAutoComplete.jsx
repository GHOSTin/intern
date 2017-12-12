import React from 'react';
import BaseComponent from './BaseComponent.jsx';
import AutoComplete from 'material-ui/AutoComplete';
import {createContainer} from 'meteor/react-meteor-data';
import {Departments} from '/imports/api/departments/departments';

const dataSourceConfig = {
    text: 'name',
    value: '_id'
};

const popoverProps = {
    style: {
        width: '90%'
    }
};

const menuProps = {
    maxHeight: 300,
    width: 100
};

export class DepartmentAutoComplete extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
          searchText: this.props.searchText,
        }
    }

    handleUpdateInput = (searchText) => {
        this.setState({
          searchText: searchText,
        });
    };

    render() {
        return(
            <div>
                <AutoComplete
                    dataSource={this.props.data}
                    dataSourceConfig={dataSourceConfig}
                    floatingLabelText={this.props.label}
                    fullWidth={true}
                    name={this.props.name}
                    popoverProps={popoverProps}
                    menuProps={menuProps}
                    onNewRequest={this.props.onNewRequest}
                    onUpdateInput={this.handleUpdateInput}
                    searchText={this.state.searchText}
                    filter={(text, key) => {
                      return key.toLowerCase().includes(text.toLowerCase())
                    }}
                />
            </div>
        )
    }
}

DepartmentAutoComplete.propTypes = {
    loading: React.PropTypes.bool,
    listExists: React.PropTypes.bool,
    data: React.PropTypes.array,
    label: React.PropTypes.string,
    id: React.PropTypes.string,
    onNewRequest: React.PropTypes.func.isRequired,
    searchText: React.PropTypes.string
};

export default DepartmentAutoCompleteContainer = createContainer(({department}) => {
    const departmentsHandle = Meteor.subscribe('departments.departments', department);
    const loading = !departmentsHandle.ready();
    const departments = Departments.find({parent_id: department}, {
                fields: {
                    _id:1,
                    name: 1
                }
            });
    const listExists = !loading && !!departments;
    return {
        loading,
        listExists,
        data: listExists ? departments.fetch() : []
    };
}, DepartmentAutoComplete);