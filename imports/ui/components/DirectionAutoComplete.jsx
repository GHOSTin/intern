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
        width: '99%'
    }
};

export class DirectionAutoComplete extends BaseComponent {
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
                    //onUpdateInput={this.props.handleUpdateInput}
                />
            </div>
        )
    }
}

DirectionAutoComplete.propTypes = {
    loading: React.PropTypes.bool,
    listExists: React.PropTypes.bool,
    data: React.PropTypes.array,
    label: React.PropTypes.string,
    id: React.PropTypes.string
};

export default AutoCompleteContainer = createContainer(({label, id}) => {
    const departmentsHandle = Meteor.subscribe('departments.directions');
    const loading = !departmentsHandle.ready();
    const departments = Departments.find();
    const listExists = !loading && !!departments;
    return {
        loading,
        listExists,
        data: listExists ? departments.fetch() : [],
        label,
        id
    };
}, DirectionAutoComplete);