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
import Avatar from 'material-ui/Avatar';
import Upload from 'material-ui-upload/Upload';
import {AvatarCropper, FileUpload} from './ImageUploader.jsx';
import EducationItem from './EducationItem.jsx';
import ActivityItem from './ActivityItem.jsx';
import InternshipItem from './InternshipItem.jsx';
import StagePresentation from './StagePresentationUpload.jsx';

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
    transform: 'translate(0, 0)'
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

export default class InternDialog extends BaseComponent {
    state = {
        intern: {
            firstname: "",
            lastname: "",
            middlename: "",
            birthday: null,
            educations: [],
            stages: [{}],
            activities: [],
            internships: [],
            direction: "",
            department: "",
            group: "",
            gender: "",
            army: false,
            tabel: null,
            enterDate: null,
            position: "",
            employmentDate: null,
            dismissalDate: null,
            tutor: "",
            startSUDate: null,
            endSUDate: null,
            avatar: "/default-userAvatar.png",
        },
        cropperOpen: false,
        img: null
    };

    constructor(props) {
        super(props);
        this.state = Object.assign(this.state, {
            editing: props.editing,
            intern: props.intern
        });
        this.handleSave = this.handleSave.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeHandlerToggle = this.changeHandlerToggle.bind(this);
        this.changeHandlerNilVal = this.changeHandlerNilVal.bind(this);
        this.newRequestHandle = this.newRequestHandle.bind(this);
        this.addNewHandle = this.addNewHandle.bind(this);
        this.changeHandlerTab = this.changeHandlerTab.bind(this);
        this.changeHandlerTabNil = this.changeHandlerTabNil.bind(this);
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
    };

    changeHandlerTabVal = (key, attr, index, value) => {
        const items = this.state.intern[key].slice();
        items[index][attr] = value;

        this.changeHandlerVal('intern', key, items);
    };

    changeHandlerTab = function(key, attr, index, event) {
        this.changeHandlerTabVal(key, attr, index, event.currentTarget.value);
    };

    changeHandlerTabNil = (key, attr, index, nill, value) => {
        this.changeHandlerTabVal(key, attr, index, value);
    };

    handleSave(e){
        e.preventDefault();
        console.log(this.state.intern);
        if(this.state.editing){
            update.call({intern: this.state.intern}, displayError)
        } else {
            insert.call({intern: this.state.intern}, displayError)
        }
        this.props.onHide()
    };

    handleFileChange(dataURI) {
        this.changeHandlerVal(null, "img", dataURI);
        this.changeHandlerVal(null, "cropperOpen", true);
        this.changeHandlerVal("intern", "avatar", this.state.intern.avatar);
    };

    handleCrop(dataURI) {
        this.changeHandlerVal(null, "img", null);
        this.changeHandlerVal(null, "cropperOpen", false);
        this.changeHandlerVal("intern", "avatar", dataURI);
    };
    handleRequestHide() {
        this.setState({
            cropperOpen: false
        });
    };

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
            let ind = index + 1;
            return (
                <Tab
                label={"Этап " + ind}
                icon={<FontIcon className="material-icons">book</FontIcon>}
                key={index}
                title={`stage ${ind}`}
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
                                    value={stage.startDate}
                                    onChange={this.changeHandlerTabNil.bind(this, 'stages', 'startDate', index)}
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
                                    value={stage.endDate}
                                    onChange={this.changeHandlerTabNil.bind(this, 'stages', 'endDate', index)}
                                />
                            </Col>
                        </Row>
                        <h2 className="m-t">ПРОЕКТ</h2>
                        <Row>
                            <Col xs={12} md={10}>
                                <TextField
                                    name="theme"
                                    fullWidth={true}
                                    floatingLabelText="Тема"
                                    value={stage.theme||""}
                                    onChange={this.changeHandlerTab.bind(this, 'stages', 'theme', index)}
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
                                    value={stage.defendDate}
                                    onChange={this.changeHandlerTabNil.bind(this, 'stages', 'defendDate', index)}
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
                                    value={stage.result}
                                    onChange={this.changeHandlerTab.bind(this, 'stages', 'result', index)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={8}>
                                <StagePresentation
                                    presentation={stage.presentation||""}
                                    changeHandler={this.changeHandlerTabVal.bind(this, 'stages', 'presentation', index)}
                                />
                            </Col>
                        </Row>
                    </div>
                </Tab>
            );
        });
        const EducationList = this.state.intern.educations.map((e, index)=>{
            return (
                <EducationItem changeHandler={(key, attr, value) => this.changeHandlerTabVal(key, attr, index, value)} key={index} {...e}/>
            )
        });
        const activitiesList = this.state.intern.activities.map((e, index)=>{
            return (
                <ActivityItem changeHandler={(key, attr, value) => this.changeHandlerTabVal(key, attr, index, value)} key={index} {...e}/>
            )
        });
        const internshipsList = this.state.intern.internships.map((e, index)=>{
            return (
                <InternshipItem changeHandler={(key, attr, value) => this.changeHandlerTabVal(key, attr, index, value)} key={index} {...e}/>
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
                                value={intern.lastname}
                                onChange={this.changeHandler.bind(this, 'intern', 'lastname')}
                            />
                            <TextField
                                name="firstname"
                                fullWidth={true}
                                floatingLabelText="Имя"
                                value={intern.firstname}
                                onChange={this.changeHandler.bind(this, 'intern', 'firstname')}
                            />
                            <TextField
                                name="middlename"
                                fullWidth={true}
                                floatingLabelText="Отчество"
                                value={intern.middlename}
                                onChange={this.changeHandler.bind(this, 'intern', 'middlename')}
                            />
                        </Col>
                        <Col xs={12} md={3}>
                            <div>
                                <div className="avatar-photo" 
                                     style={{
                                        "position": "relative",
                                        "width": 150,
                                        "margin": "0 auto"
                                     }}
                                >
                                    <FileUpload 
                                        handleFileChange={this.handleFileChange}
                                    />
                                    <div className="avatar-edit">
                                        <FontIcon
                                            className="material-icons"
                                            style={{
                                                "fontSize": 66,
                                                "marginTop": 30,
                                            }}
                                            color={"rgba(255,255,255,.8)"}
                                        >
                                            photo_camera
                                        </FontIcon>
                                    </div>
                                    <Avatar size={150} src={intern.avatar} style={{boxShadow: "0 0 1px 6px #e8e8e8"}}/>
                                </div>
                                {this.state.cropperOpen &&
                                <AvatarCropper
                                    onRequestHide={this.handleRequestHide.bind(this)}
                                    cropperOpen={this.state.cropperOpen}
                                    onCrop={this.handleCrop.bind(this)}
                                    image={this.state.img}
                                    width={300}
                                    height={300}
                                />
                                }
                            </div>
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
                                name="tabel"
                                fullWidth={true}
                                floatingLabelText="Табельный номер"
                                type="number"
                                onChange={this.changeHandler.bind(this, 'intern', 'tabel')}
                                value={intern.tabel}
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
                                name="enterDate"
                                value={intern.enterDate}
                                onChange={this.changeHandlerNilVal.bind(this, 'intern', 'enterDate')}
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
                                department={""}
                                onNewRequest={this.newRequestHandle.bind(this, 'intern', 'department')}
                                searchText={(intern.department)?intern.department.name:""}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <DepartmentAutoCompleteContainer
                                name="group"
                                label="Отдел"
                                department={(intern.department)?intern.department._id:""}
                                onNewRequest={this.newRequestHandle.bind(this, 'intern', 'group')}
                                searchText={(intern.group)?intern.group.name:""}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                name="position"
                                fullWidth={true}
                                floatingLabelText="Должность"
                                value={intern.position}
                                onChange={this.changeHandler.bind(this, 'intern', 'position')}
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
                                value={intern.employmentDate}
                                name="employmentDate"
                                onChange={this.changeHandlerNilVal.bind(this, 'intern', 'employmentDate')}
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
                                value={intern.dismissalDate}
                                name="dismissalDate"
                                onChange={this.changeHandlerNilVal.bind(this, 'intern', 'dismissalDate')}
                            />
                        </Col>
                        <Col xs={9} sm={4}>
                            <TextField
                                name="tutor"
                                fullWidth={true}
                                floatingLabelText="Наставник"
                                value={intern.tutor}
                                onChange={this.changeHandler.bind(this, 'intern', 'tutor')}
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
                                value={intern.startSUDate}
                                name="startSUDate"
                                onChange={this.changeHandlerNilVal.bind(this, 'intern', 'startSUDate')}
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
                                value={intern.endSUDate}
                                name="endSUDate"
                                onChange={this.changeHandlerNilVal.bind(this, 'intern', 'endSUDate')}
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

/*InternDialog.propTypes = {
    open: React.PropTypes.bool,
    onHide: React.PropTypes.func.isRequired,
    intern:  React.PropTypes.objectOf(React.PropTypes.shape({
        firstname: React.PropTypes.any,
        lastname: React.PropTypes.any,
        middlename: React.PropTypes.any,
        direction: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        department: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        group: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    }))
};*/

InternDialog.defaultProps = {
    intern: {
        firstname: "",
        lastname: "",
        middlename: "",
        birthday: null,
        educations: [],
        stages: [{}],
        activities: [],
        internships: [],
        direction: "",
        department: "",
        group: "",
        gender: "",
        army: false,
        tabel: null,
        enterDate: null,
        position: "",
        employmentDate: null,
        dismissalDate: null,
        tutor: "",
        startSUDate: null,
        endSUDate: null,
        avatar: "/default-userAvatar.png",
    },
};