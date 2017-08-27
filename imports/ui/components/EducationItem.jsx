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
    state={
        university: "",
        speciality: "",
        theme: "",
        startYear: undefined,
        endYear: undefined,
        department: "",
        course: ""
    };

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            university: props.university,
            speciality: props.speciality,
            theme: props.theme,
            startYear: props.startYear,
            endYear: props.endYear,
            department: props.department,
            course: props.course
        })
    }

    onChangeInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChangeStartDate(x, date){
        this.setState({
            startYear: date
        })
    }

    onChangeEndDate(x, date){
        this.setState({
            endYear: date
        })
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.state.university + " - " + this.state.speciality}
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
                                ref={(ref) => this.university = ref}
                                id="university"
                                defaultValue={this.state.university}
                            />
                        </Col>
                        <Col xs={12} sm={4}>
                            <TextField
                                floatingLabelText="Специальность"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                                ref={(ref) => this.speciality = ref}
                                id="speciality"
                                defaultValue={this.state.speciality}
                            />
                        </Col>
                        <Col xs={12} sm={4}>
                            <TextField
                                floatingLabelText="Кафедра"
                                fullWidth={true}
                                id="department"
                                onChange={this.onChangeInput}
                                defaultValue={this.state.department}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={2}>
                            <TextField
                                floatingLabelText="Курс"
                                fullWidth={true}
                                type="number"
                                id="course"
                                onChange={this.onChangeInput}
                                defaultValue={this.state.course}
                            />
                        </Col>
                        <Col xs={12} sm={10}>
                            <TextField
                                floatingLabelText="Тема диплома"
                                fullWidth={true}
                                id="theme"
                                onChange={this.onChangeInput}
                                defaultValue={this.state.theme}
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
                                //formatDate={(date)=>{return date?date.getFullYear():""}}
                                defaultDate={this.state.startYear}
                                id="startYear"
                                //onChange={this.onChangeStartDate}
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
                                //formatDate={(date)=>{return date?date.getFullYear():""}}
                                defaultDate={this.state.endYear}
                                id="endYear"
                                //onChange={this.onChangeEndDate}
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