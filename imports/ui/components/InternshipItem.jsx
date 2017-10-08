import React from 'react';
import { _ } from 'meteor/underscore';
import BaseComponent from './BaseComponent.jsx';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {Row, Col} from 'react-flexbox-grid';

const IntlPolyfill = require('intl');
DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/ru-RU');

export default class InternshipItem extends BaseComponent {

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    onChangeInput(e) {
        this.props.changeHandler('internships',e.currentTarget.name,e.currentTarget.value)
    }

    onChangeDate(name, nill, value){
        this.props.changeHandler('internships',name,value)
    }


    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.place + " (" + this.props.tutor + ")"}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <Row bottom="xs">
                        <Col xs={12}>
                            <TextField
                                floatingLabelText="Место стажировки"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                                name="place"
                                multiLine={true}
                                rows={2}
                                value={this.props.place}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <TextField
                                floatingLabelText="Куратор"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                                name="tutor"
                                value={this.props.tutor}
                            />
                        </Col>
                        <Col xs={12} sm={4}>
                            <DatePicker
                                floatingLabelText="Дата начала стажировки"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                fullWidth={true}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                value={this.props.startDate}
                                name="startDate"
                                onChange={this.onChangeDate.bind(this, 'startDate')}
                            />
                        </Col>
                        <Col xs={12} sm={4}>
                            <DatePicker
                                floatingLabelText="Дата окончания стажировки"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                fullWidth={true}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                value={this.props.endDate}
                                name="endDate"
                                onChange={this.onChangeDate.bind(this, 'endDate')}
                            />
                        </Col>
                    </Row>
                </CardText>
            </Card>
        )
    }
}


InternshipItem.propTypes = {
    place: React.PropTypes.string,
    tutor: React.PropTypes.string,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
};

InternshipItem.defaultProps = {
    place: "",
    tutor: "",
    startDate: null,
    endDate: null,
};