import React from 'react';
import { _ } from 'meteor/underscore';
import BaseComponent from './BaseComponent.jsx';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import {Row, Col} from 'react-flexbox-grid';

const IntlPolyfill = require('intl');
DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/ru-RU');

export default class EducationItem extends BaseComponent {
    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    onChangeInput(e) {
        this.props.changeHandler('educations',e.currentTarget.name,e.currentTarget.value)
    }

    onChangeDate(name, nill, value){
        this.props.changeHandler('educations',name,value)
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.university + " - " + this.props.speciality}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <TextField
                                floatingLabelText="ВУЗ"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                                name="university"
                                value={this.props.university}
                            />
                        </Col>
                        <Col xs={12} sm={4}>
                            <TextField
                                floatingLabelText="Специальность"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                                name="speciality"
                                value={this.props.speciality}
                            />
                        </Col>
                        <Col xs={12} sm={4}>
                            <TextField
                                floatingLabelText="Кафедра"
                                fullWidth={true}
                                name="department"
                                onChange={this.onChangeInput}
                                value={this.props.department}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={2}>
                            <TextField
                                floatingLabelText="Курс"
                                fullWidth={true}
                                type="number"
                                name="course"
                                onChange={this.onChangeInput}
                                value={this.props.course}
                            />
                        </Col>
                        <Col xs={12} sm={10}>
                            <TextField
                                floatingLabelText="Тема диплома"
                                fullWidth={true}
                                name="theme"
                                onChange={this.onChangeInput}
                                value={this.props.theme}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <DatePicker
                                floatingLabelText="Год начала обучения"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                fullWidth={true}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                openToYearSelection={true}
                                formatDate={(date)=>{return date?date.getFullYear():""}}
                                value={this.props.startYear}
                                name="startYear"
                                onChange={this.onChangeDate.bind(this, 'startYear')}
                            />
                        </Col>
                        <Col xs={6}>
                            <DatePicker
                                floatingLabelText="Год окончания обучения"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                fullWidth={true}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                openToYearSelection={true}
                                formatDate={(date)=>{return date?date.getFullYear():""}}
                                value={this.props.endYear}
                                name="endYear"
                                onChange={this.onChangeDate.bind(this, 'endYear')}
                            />
                        </Col>
                    </Row>
                </CardText>
            </Card>
        )
    }
}


EducationItem.propTypes = {
    university: React.PropTypes.string,
    speciality: React.PropTypes.string,
    theme: React.PropTypes.string,
    startYear: React.PropTypes.object,
    endYear: React.PropTypes.object,
    department: React.PropTypes.string,
    course: React.PropTypes.string
};

EducationItem.defaultProps ={
    university: "",
    speciality: "",
    theme: "",
    startYear: null,
    endYear: null,
    department: "",
    course: ""
};