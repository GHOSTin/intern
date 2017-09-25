import React from "react";
import BaseComponent from '../components/BaseComponent.jsx';
import DepartmentAutoCompleteContainer from '/imports/ui/components/DepartmentAutoComplete';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {grey400, grey50} from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import EducationItem from './EducationItem.jsx';
import ActivityItem from './ActivityItem.jsx';
import InternshipItem from './InternshipItem.jsx';

import {Row, Col} from 'react-flexbox-grid';

import {insert, update} from '/imports/api/interns/methods'
import { displayError } from '../helpers/errors.js';

let DateTimeFormat;

const IntlPolyfill = require('intl');
DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/ru-RU');

const style = {
    color: grey400
};

const customContentStyle = {
    width: '99%',
    maxWidth: 'none',
};

const dataSourceConfig = {
    text: 'name',
    value: '_id'
};

const directionsList = [
    {_id: 1, name: "Департамент по стратегии и развития бизнесу"},
    {_id: 2, name: "Техническая дирекция"},
    {_id: 3, name: "Коммерческая дирекция"},
    {_id: 4, name: "Управляющая дирекция"},
    {_id: 5, name: "Служба главного инженера"},
    {_id: 6, name: "Дирекция по персоналу"},
    {_id: 7, name: "Дирекция по управлению цепью поставок"},
    {_id: 8, name: "Дирекция по финансам и экономике"},
    {_id: 9, name: "Дирекция по правовым и корпоративным вопросам"},
];

export default class InternDialog extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = Object.assign(this.state, {
            editing: props.editing,
            intern: props.intern
        });
        this.handleSave = this.handleSave.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeHandlerToggle = this.changeHandlerToggle.bind(this);
        this.changeHandlerNilVal = this.changeHandlerNilVal.bind(this);
        this.newRequestHandle = this.newRequestHandle.bind(this);
        this.addNewHandle = this.addNewHandle.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            editing: props.editing,
            intern: props.intern
        })
    }

    changeHandlerVal(key, attr, value) {
        let state = {};
        if (key !== null) {
            state[key] = this.state[key] || {};
            state[key][attr] = value;
        } else {
            state[attr] = value;
        }
        state.lastChange = new Date().now; // ms
        this.setState(state);
    };

    changeHandler = function(key, attr, event) {
        this.changeHandlerVal(key, attr, event.currentTarget.value);
    };

    changeHandlerToggle = function(key, attr, value) {
        let state = {};
        state[key] = this.state[key] || {};
        state[key][attr] = !state[key][attr];
        state.lastChange = new Date().now; // ms
        this.setState(state);
    };

    changeHandlerNilVal = function(key, attr, nill, value) {
        this.changeHandlerVal(key, attr, value);
    };

    newRequestHandle = function(key, attr, value, index){
        this.changeHandlerVal(key, attr, value);
    };

    addNewHandle(key, attr) {
        let newArr = this.state.intern[attr].slice();
        newArr.push({});
        this.changeHandlerVal(key, attr, newArr);
    }

    handleSave(e){
        e.preventDefault();
        console.log(this.state.intern);
        if(this.props.editing) {
            update.call({intern: this.state.intern}, displayError)
        } else {
            insert.call({intern: this.state.intern}, displayError)
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Отмена"
                primary={false}
                keyboardFocused={false}
                onTouchTap={this.props.onHide}
            />,
            <FlatButton
                label="Сохранить"
                primary={true}
                keyboardFocused={false}
                onTouchTap={this.handleSave}
            />,
        ];

        let {intern} = this.state;

        const stagesTabs = this.state.intern.stages.map((stage, index)=>{
            return (
                <Tab
                label={"Этап " + (++index)}
                icon={<FontIcon className="material-icons">book</FontIcon>}
                key={index}
                title={`stage ${index}`}
                >
                    <div className="m-r m-l">
                        <Row>
                            <Col xs={12} md={6}>
                                <DatePicker
                                    floatingLabelText="Дата начала"
                                    locale="ru-RU"
                                    DateTimeFormat={DateTimeFormat}
                                    okLabel="Принять"
                                    cancelLabel="Отмена"
                                    fullWidth={true}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <DatePicker
                                    floatingLabelText="Дата окончания"
                                    locale="ru-RU"
                                    DateTimeFormat={DateTimeFormat}
                                    okLabel="Принять"
                                    cancelLabel="Отмена"
                                    fullWidth={true}
                                />
                            </Col>
                        </Row>
                        <h2 className="m-t">ПРОЕКТ</h2>
                        <Row>
                            <Col xs={12} md={10}>
                                <TextField
                                    className="theme"
                                    fullWidth={true}
                                    floatingLabelText="Тема"
                                />
                            </Col>
                            <Col xs={12} md={2}>
                                <DatePicker
                                    floatingLabelText="Дата защиты"
                                    locale="ru-RU"
                                    DateTimeFormat={DateTimeFormat}
                                    okLabel="Принять"
                                    cancelLabel="Отмена"
                                    fullWidth={true}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <TextField
                                    floatingLabelText="Принятое решение по итогам защиты"
                                    multiLine={true}
                                    rows={3}
                                    rowsMax={6}
                                    fullWidth={true}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>

                            </Col>
                        </Row>
                    </div>
                </Tab>
            );
        });
        const EducationList = this.state.intern.educations.map((e, index)=>{
            return (
                <EducationItem key={index} {...e}/>
            )
        });
        const activitiesList = this.state.intern.activities.map((e, index)=>{
            return (
                <ActivityItem key={index} {...e}/>
            )
        });
        const internshipsList = this.state.intern.internships.map((e, index)=>{
            return (
                <InternshipItem key={index} {...e}/>
            )
        });
        let birthday = intern.birthday !== null? new Date(intern.birthday): null;
        return (
            <div>
                <Dialog
                    title="Карточка стажера"
                    titleStyle={{
                        background: grey50
                    }}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onHide}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                >
                    <h2 className="m-t">Общая информация</h2>
                    <Row>
                        <Col xs={12} md={9}>
                            <TextField
                                name="lastname"
                                fullWidth={true}
                                floatingLabelText="Фамилия"
                                defaultValue={intern.lastname}
                                onChange={this.changeHandler.bind(this, 'intern', 'lastname')}
                            />
                            <TextField
                                name="firstname"
                                fullWidth={true}
                                floatingLabelText="Имя"
                                defaultValue={intern.firstname}
                                onChange={this.changeHandler.bind(this, 'intern', 'firstname')}
                            />
                            <TextField
                                name="middlename"
                                fullWidth={true}
                                floatingLabelText="Отчество"
                                defaultValue={intern.middlename}
                                onChange={this.changeHandler.bind(this, 'intern', 'middlename')}
                            />
                        </Col>
                        <Divider />
                    </Row>
                    <Row>
                        <Col xs={12} md={9}>
                            <Row>
                                <Col xs={12} md={3} className="m-t">
                                    <span style={style}>Пол:</span>
                                </Col>
                                <Col xs={12} md={9} className="m-t">
                                    <RadioButtonGroup
                                        name="gender"
                                        defaultSelected={intern.gender}
                                        onChange={this.changeHandler.bind(this, 'intern', 'gender')}
                                    >
                                        <RadioButton
                                            value="male"
                                            label="Мужской"
                                        />
                                        <RadioButton
                                            value="female"
                                            label="Женский"
                                        />
                                    </RadioButtonGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row middle="xs">
                        <Col xs={12} md={3}>
                            <DatePicker
                                floatingLabelText="Дата рождения"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                fullWidth={true}
                                name="birthday"
                                value={birthday}
                                onChange={this.changeHandlerNilVal.bind(this, 'intern', 'birthday')}
                            />
                        </Col>
                        <Col xs={12} md={3}>
                            <Checkbox
                                label="Военнообязанный"
                                labelPosition="left"
                                name="army"
                                checked={intern.army}
                                onCheck={this.changeHandlerToggle.bind(this, 'intern', 'army')}
                            />
                        </Col>
                    </Row>
                    <h2 className="m-t m-b">
                        Образование
                        <FlatButton
                            label="Добавить"
                            style={{float: "right"}}
                            onTouchTap={this.addNewHandle.bind(this, 'intern', 'educations')}
                        />
                    </h2>
                    <Row>
                        <Col xs={12}>
                            {EducationList}
                        </Col>
                    </Row>
                    <h2 className="m-t">Информация о работнике</h2>
                    <Row>
                        <Col xs={12} md={6}>
                            <TextField
                                ref="tabel"
                                fullWidth={true}
                                floatingLabelText="Табельный номер"
                                type="number"
                                defaultValue={intern.tabel}
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <DatePicker
                                floatingLabelText="Дата приема на завод"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                fullWidth={true}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                ref="enterDate"
                                defaultDate={intern.enterDate}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4}>
                            <AutoComplete
                                dataSource={directionsList}
                                dataSourceConfig={dataSourceConfig}
                                floatingLabelText="Дирекция"
                                fullWidth={true}
                                name="direction"
                                onNewRequest={this.newRequestHandle.bind(this, 'intern', 'direction')}
                                filter={(text, key)=> {return key.toLowerCase().includes(text.toLowerCase())}}
                                searchText={(intern.direction)?intern.direction.name:""}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <DepartmentAutoCompleteContainer
                                name="department"
                                label="Управление"
                                department={{_id: ""}}
                                onNewRequest={this.newRequestHandle.bind(this, 'intern', 'department')}
                                searchText={(intern.department)?intern.department.name:""}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <DepartmentAutoCompleteContainer
                                name="group"
                                label="Отдел"
                                department={this.state.intern.department}
                                onNewRequest={this.newRequestHandle.bind(this, 'intern', 'group')}
                                searchText={(intern.group)?intern.group.name:""}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                ref="position"
                                fullWidth={true}
                                floatingLabelText="Должность"
                                defaultValue={intern.position}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={3}>
                            <DatePicker
                                floatingLabelText="Дата трудоустройства"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                fullWidth={true}
                                defaultDate={intern.employmentDate||undefined}
                                ref="employmentDate"
                            />
                        </Col>
                        <Col xs={12} md={3}>
                            <DatePicker
                                floatingLabelText="Дата увольнения"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                fullWidth={true}
                                defaultDate={intern.dismissalDate||undefined}
                                ref="dismissalDate"
                            />
                        </Col>
                        <Col xs={9} sm={4}>
                            <TextField
                                ref="tutor"
                                fullWidth={true}
                                floatingLabelText="Наставник"
                                defaultValue={intern.tutor}
                            />
                        </Col>
                        <Col xs={3} sm={2}>
                            <FlatButton label="История" fullWidth={true} style={{marginTop: 15}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <DatePicker
                                floatingLabelText="Дата начала ШЕ"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                fullWidth={true}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <DatePicker
                                floatingLabelText="Дата окончания ШЕ"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                                fullWidth={true}
                            />
                        </Col>
                    </Row>
                    <h2 className="m-t m-b">
                        Активности
                        <FlatButton
                            label="Добавить"
                            style={{float: "right"}}
                            onTouchTap={this.addNewHandle.bind(this, 'intern', 'activities')}
                        />
                    </h2>
                    <Row>
                        <Col xs={12}>
                            {activitiesList}
                        </Col>
                    </Row>
                    <h2 className="m-t m-b">Этапы стажировки</h2>
                    <Row>
                        <Col xs={12}>
                            <Paper zDepth={1}>
                                <Tabs>
                                    {stagesTabs}
                                    <Tab
                                        label="Добавить этап"
                                        icon={<FontIcon className="material-icons">add</FontIcon>}
                                        onActive={this.addNewHandle.bind(this, 'intern', 'stages')}
                                        title="add"
                                    />
                                </Tabs>
                            </Paper>
                        </Col>
                    </Row>
                    <h2 className="m-t m-b">
                        Кроссфункциольные стажировки
                        <FlatButton
                            label="Добавить"
                            style={{float: "right"}}
                            onTouchTap={this.addNewHandle.bind(this, 'intern', 'internships')}
                        />
                    </h2>
                    <Row>
                        <Col xs={12}>
                            {internshipsList}
                        </Col>
                    </Row>
                </Dialog>
            </div>
        )
    }
}

InternDialog.propTypes = {
    open: React.PropTypes.bool,
    onHide: React.PropTypes.func.isRequired,
    intern: React.PropTypes.object
};

InternDialog.defaultProps = {
    intern: {
        firstname: "",
        birthday: null,
        educations: [],
        stages: [{}],
        activities: [],
        internships: [],
        direction: "",
        department: "",
        group: "",
        gender: "",
        army: false
    }
};