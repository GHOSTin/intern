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
    }

    render() {
        return(
            <div>
                <AutoComplete
                    dataSource={this.props.data}
                    dataSourceConfig={dataSourceConfig}
                    floatingLabelText={this.props.label}
                    fullWidth={true}
                    id={this.props.id}
                    popoverProps={popoverProps}
                    menuProps={menuProps}
                    onNewRequest={this.props.onNewRequest}
                    searchText={this.props.searchText}
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
    const departmentsHandle = Meteor.subscribe('departments.departments', department._id);
    const loading = !departmentsHandle.ready();
    const departments = Departments.find({parent_id: department._id}, {
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