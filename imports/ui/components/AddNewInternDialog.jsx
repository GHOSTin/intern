import React from "react";
import BaseComponent from '../components/BaseComponent.jsx';
import DirectionAutoCompleteContainer from '/imports/ui/components/DirectionAutoComplete';
import DepartmentAutoCompleteContainer from '/imports/ui/components/DepartmentAutoComplete';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import areIntlLocalesSupported from 'intl-locales-supported';
import {grey400, grey50} from 'material-ui/styles/colors';

import {Row, Col} from 'react-flexbox-grid';



let DateTimeFormat;

if (areIntlLocalesSupported(['ru-RU'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/ru-RU');
}

const style = {
    color: grey400
};

const customContentStyle = {
    width: '99%',
    maxWidth: 'none',
};

export default class AddNewInternDialog extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            direction:{},
            department: {},
            group: {}
        };
        this.onNewRequestDirection = this.onNewRequestDirection.bind(this);
        this.onNewRequestDepartment = this.onNewRequestDepartment.bind(this);
        this.onNewRequestGroup = this.onNewRequestGroup.bind(this);
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
                    <h3 className="m-t">Общая информация</h3>
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
                    <Row>
                        <Col xs={12} lg={3}>
                            <DatePicker
                                floatingLabelText="Дата рождения"
                                locale="ru-RU"
                                DateTimeFormat={DateTimeFormat}
                                okLabel="Принять"
                                cancelLabel="Отмена"
                            />
                        </Col>
                    </Row>
                    <h3 className="m-t">Информация о работнике</h3>
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
                            <DirectionAutoCompleteContainer
                                id="orgDirection"
                                label="Дирекция"
                                onNewRequest={this.onNewRequestDirection}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <DepartmentAutoCompleteContainer
                                id="orgDepartment"
                                label="Управление"
                                direction={this.state.direction}
                                onNewRequest={this.onNewRequestDepartment}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <DepartmentAutoCompleteContainer
                                id="orgGroup"
                                label="Отдел"
                                direction={this.state.department}
                                onNewRequest={this.onNewRequestGroup}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <TextField
                                id="position"
                                fullWidth={true}
                                floatingLabelText="Должность"
                            />
                        </Col>
                    </Row>
                </Dialog>
            </div>
        )
    }
}

AddNewInternDialog.propTypes = {
    open: React.PropTypes.bool,
};