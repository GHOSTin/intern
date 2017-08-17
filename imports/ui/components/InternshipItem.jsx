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

        this.state={
            place: props.place,
            tutor: props.tutor,
            dateStart: props.dateStart,
            dateEnd: props.dateEnd,
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
    }

    onChangeInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChangeStartDate(x, date){
        this.setState({
            dateStart: date
        })
    }

    onChangeEndDate(x, date){
        this.setState({
            dateEnd: date
        })
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.state.place + " (" + this.state.tutor + ")"}
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
                                ref={(ref) => this.place = ref}
                                id="place"
                                multiLine={true}
                                rows={2}
                                value={this.state.place}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <TextField
                                floatingLabelText="Куратор"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                                ref={(ref) => this.tutor = ref}
                                id="tutor"
                                value={this.state.tutor}
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
                                value={this.state.dateStart}
                                id="dateStart"
                                onChange={this.onChangeStartDate}
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
                                value={this.state.dateEnd}
                                id="dateEnd"
                                onChange={this.onChangeEndDate}
                            />
                        </Col>
                    </Row>
                </CardText>
            </Card>
        )
    }
}


InternshipItem.propTypes = {

};

InternshipItem.defaultProps = {
    place: "",
    tutor: "",
    dateStart: {},
    dateEnd: {},
};