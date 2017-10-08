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

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    onChangeInput(e) {
        this.props.changeHandler('activities',e.currentTarget.name,e.currentTarget.value)
    }

    onChangeDate(name, nill, value){
        this.props.changeHandler('activities',name,value)
    }

    onChangeSelect(name, e, key, value){
        this.props.changeHandler('activities',name,value);
        this.props.changeHandler('activities',`${name}Name`,e.target.innerText);
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.typeName + " - " + this.props.name}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <Row bottom="xs">
                        <Col xs={12} sm={3}>
                            <DropDownMenu
                                value={this.props.type}
                                name="type"
                                onChange={this.onChangeSelect.bind(this, 'type')}
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
                                name="name"
                                value={this.props.name}
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
                                value={this.props.date}
                                name="date"
                                onChange={this.onChangeDate.bind(this, 'date')}
                            />
                        </Col>
                        <Col xs={6} sm={6}>
                            <TextField
                                floatingLabelText="Тренер/лектор"
                                fullWidth={true}
                                name="trainer"
                                onChange={this.onChangeInput}
                                value={this.props.trainer}
                            />
                        </Col>
                    </Row>
                </CardText>
            </Card>
        )
    }
}


ActivityItem.propTypes = {
    type: React.PropTypes.number,
    typeName: React.PropTypes.string,
    name: React.PropTypes.string,
    date: React.PropTypes.object,
    trainer: React.PropTypes.string,
};

ActivityItem.defaultProps ={
    type: null,
    typeName: "",
    name: "",
    date: null,
    trainer: ""
};