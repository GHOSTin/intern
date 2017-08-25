import React from 'react';
import { _ } from 'meteor/underscore';
import BaseComponent from './BaseComponent.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';

export default class InternTableItem extends BaseComponent {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(){
        this.props.onEditingChange(this.props.intern, true);
    }

    render() {
        const { intern, index } = this.props;
        return (
            <TableRow key={index}>
                <TableRowColumn>{index+1}</TableRowColumn>
                <TableRowColumn>{intern.firstname}</TableRowColumn>
                <TableRowColumn>{intern.text}</TableRowColumn>
                <TableRowColumn style={{overflow: 'visible'}}>
                    <IconButton
                        tooltip="Изменить"
                        tooltipPosition='top-center'
                        onClick={this.onClickHandler}
                    >
                        <ContentCreate/>
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        )
    }
}


InternTableItem.propTypes = {
    intern: React.PropTypes.object,
    index: React.PropTypes.number,
    editing: React.PropTypes.bool,
    onEditingChange: React.PropTypes.func,
};