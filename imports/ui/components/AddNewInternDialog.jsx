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
    value: 'id'
};

const directionsList = [
    {id: 1, name: "Департамент по стратегии и развития бизнесу"},
    {id: 2, name: "Техническая дирекция"},
    {id: 3, name: "Коммерческая дирекция"},
    {id: 4, name: "Управляющая дирекция"},
    {id: 5, name: "Служба главного инженера"},
    {id: 6, name: "Дирекция по персоналу"},
    {id: 7, name: "Дирекция по управлению цепью поставок"},
    {id: 8, name: "Дирекция по финансам и экономике"},
    {id: 9, name: "Дирекция по правовым и корпоративным вопросам"},
];

export default class AddNewInternDialog extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = Object.assign(this.state, {
            direction: props.direction,
            department: props.department,
            group: props.group,
            stages: props.stages,
            educations: props.educations,
            activities: props.activities,
            internships: props.internships
        });
        this.onNewRequestDirection = this.onNewRequestDirection.bind(this);
        this.onNewRequestDepartment = this.onNewRequestDepartment.bind(this);
        this.onNewRequestGroup = this.onNewRequestGroup.bind(this);
        this.addStagesTab = this.addStagesTab.bind(this);
        this.addEducation = this.addEducation.bind(this);
        this.addActivities = this.addActivities.bind(this);
        this.addInternships = this.addInternships.bind(this);
    }

    componentWillReceiveProps(){
        this.setState({
            direction: this.props.direction,
            department: this.props.department,
            group: this.props.group,
            stages: this.props.stages,
            educations: this.props.educations,
            activities: this.props.activities,
            internships: this.props.internships
        })
    }

    onNewRequestDirection(value) {
        this.setState({
            direction: value
        });
    }

    onNewRequestDepartment(value) {
        this.setState({
            department: value
        })
    }

    onNewRequestGroup(value) {
        this.setState({
            group: value
        })
    }

    addStagesTab() {
        let newStages = this.state.stages.slice();
        newStages.push({});
        this.setState({
            stages: newStages
        })
    }

    addEducation() {
        let newEducations = this.state.educations.slice();
        newEducations.push({});
        this.setState({
            educations: newEducations
        })
    }

    addActivities() {
        let newActivities = this.state.activities.slice();
        newActivities.push({});
        this.setState({
            activities: newActivities
        })
    }

    addInternships() {
        let newInternships = this.state.internships.slice();
        newInternships.push({});
        this.setState({
            internships: newInternships
        })
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
                onTouchTap={this.props.onHide}
            />,
        ];

        const stagesTabs = this.state.stages.map((stage, index)=>{
            return (
                <Tab
                label={"Этап " + (++index)}
                icon={<FontIcon className="material-icons">book</FontIcon>}
                key={index}
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
        const EducationList = this.state.educations.map((e, index)=>{
            return (
                <EducationItem key={index} {...e}/>
            )
        });
        const activitiesList = this.state.activities.map((e, index)=>{
            return (
                <ActivityItem key={index} {...e}/>
            )
        });
        const internshipsList = this.state.internships.map((e, index)=>{
            return (
                <InternshipItem key={index} {...e}/>
            )
        });
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
                                id="lastname"
                                fullWidth={true}
                                floatingLabelText="Фамилия"
                            />
                            <TextField
                                id="firstname"
                                fullWidth={true}
                                floatingLabelText="Имя"
                            />
                            <TextField
                                id="middlename"
                                fullWidth={true}
                                floatingLabelText="Отчество"
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
                                    <RadioButtonGroup name="gender">
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
                            />
                        </Col>
                        <Col xs={12} md={3}>
                            <Checkbox
                                label="Военнообязанный"
                                labelPosition="left"
                            />
                        </Col>
                    </Row>
                    <h2 className="m-t m-b">
                        Образование
                        <FlatButton
                            label="Добавить"
                            style={{float: "right"}}
                            onTouchTap={this.addEducation}
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
                                id="tabelNumber"
                                fullWidth={true}
                                floatingLabelText="Табельный номер"
                                type="number"
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
                                id="orgDirection"
                                onNewRequest={this.onNewRequestDirection}
                                filter={(text, key)=> {return key.toLowerCase().includes(text.toLowerCase())}}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <DepartmentAutoCompleteContainer
                                id="orgDepartment"
                                label="Управление"
                                department={{_id: ""}}
                                onNewRequest={this.onNewRequestDepartment}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <DepartmentAutoCompleteContainer
                                id="orgGroup"
                                label="Отдел"
                                department={this.state.department}
                                onNewRequest={this.onNewRequestGroup}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="position"
                                fullWidth={true}
                                floatingLabelText="Должность"
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
                            />
                        </Col>
                        <Col xs={9} sm={4}>
                            <TextField
                                id="tauter"
                                fullWidth={true}
                                floatingLabelText="Наставник"
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
                            onTouchTap={this.addActivities}
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
                                        onActive={this.addStagesTab}
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
                            onTouchTap={this.addInternships}
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

AddNewInternDialog.propTypes = {
    open: React.PropTypes.bool,
    onHide: React.PropTypes.func.isRequired
};

AddNewInternDialog.defaultProps = {
    direction: {},
    department: {},
    group: {},
    stages: [{}],
    educations: [],
    activities: [],
    internships: [],
};