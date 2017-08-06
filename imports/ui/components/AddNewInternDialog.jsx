import React from "react";
import BaseComponent from '../components/BaseComponent.jsx';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import areIntlLocalesSupported from 'intl-locales-supported';

import {Row, Col} from 'react-materialize';


let DateTimeFormat;

if (areIntlLocalesSupported(['ru-RU'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/ru-RU');
}

const customContentStyle = {
    width: '75%',
    maxWidth: 'none',
};

export default class AddNewInternDialog extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const actions = [
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
                    title="Dialog With Date Picker"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onHide}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                >
                    Open a Date Picker dialog from within a dialog.
                    <Row>
                        <Col s={3} l={1}>
                            <DatePicker hintText="Portrait Dialog" locale="ru-RU" DateTimeFormat={DateTimeFormat}/>
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