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

export default class ActivityItem extends BaseComponent {
    state={
        type: "",
        name: "",
        date: {},
        trainer: "",
        typeName: ""
    };

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    onChangeInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChangeDate(x, date){
        this.setState({
            date: date
        })
    }

    onChangeSelect(e, key, value){
        this.setState({
            type: value,
            typeName: e.target.innerText
        })
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.state.typeName + " - " + this.state.name}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <Row bottom="xs">
                        <Col xs={12} sm={3}>
                            <DropDownMenu
                                value={this.state.type}
                                id="type"
                                onChange={this.onChangeSelect}
                                autoWidth={false}
                                style={{width: '100%'}}
                            >
                                <MenuItem value={1} primaryText="Тренинг"/>
                                <MenuItem value={2} primaryText="Экскурсия"/>
                                <MenuItem value={3} primaryText="Слет"/>
                                <MenuItem value={4} primaryText="Карьерное мероприятие"/>
                                <MenuItem value={5} primaryText="День информирования"/>
                                <MenuItem value={6} primaryText="Встреча с руководителем"/>
                            </DropDownMenu>
                        </Col>
                        <Col xs={12} sm={9}>
                            <TextField
                                floatingLabelText="Название мероприятия"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                                ref={(ref) => this.speciality = ref}
                                id="name"
                                value={this.state.name}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={3}>
                            <DatePicker
                                floatingLabelText="Дата проведения"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                fullWidth={true}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                openToYearSelection={true}
                                value={this.state.date}
                                id="date"
                                onChange={this.onChangeDate}
                            />
                        </Col>
                        <Col xs={6} sm={6}>
                            <TextField
                                floatingLabelText="Тренер/лектор"
                                fullWidth={true}
                                id="trainer"
                                onChange={this.onChangeInput}
                                value={this.state.trainer}
                            />
                        </Col>
                    </Row>
                </CardText>
            </Card>
        )
    }
}


ActivityItem.propTypes = {

};