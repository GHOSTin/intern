import React from "react";
import BaseComponent from '../components/BaseComponent.jsx';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Upload from 'material-ui-upload/Upload';

import {Presentation} from '/imports/api/stages/common.js';

const style = {
    chip: {
        margin: 4,
        cursor: 'pointer'
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
};


export default class StagePresentation extends BaseComponent {
    state = {
        presentation: null,
        file: null
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let exists = Presentation.findOne({_id: this.props.presentation});
        if (exists) {
            this.setState({
                presentation: exists.original.name,
                file: exists
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            presentation: null,
            file: null
        });
    }

    onFileLoad(e, file) {
        Presentation.insert(file, (error, fileObj) => {
            this.props.changeHandler(fileObj._id);
            this.setState({
                presentation: fileObj.original.name,
                file: fileObj
            });
        })
    }

    handleRequestDownload() {
        setTimeout(() => {
            const response = {
                file: this.state.file.url(),
            };
            // server sent the url to the file!
            // now, let's download:
            window.open(response.file);
            // you could also do:
            // window.location.href = response.file;
        }, 100);
    }

    handleRequestDelete() {
        Presentation.remove(this.props.presentation, (error, fileObj) => {
            this.props.changeHandler("");
            this.setState({
                presentation: null,
                file: null
            });
        })
    }

    render() {
        return this.props.presentation ? (
            <Chip
                style={style.chip}
                onRequestDelete={this.handleRequestDelete.bind(this)}
                onClick={this.handleRequestDownload.bind(this)}
            >
                <Avatar icon={<FontIcon className="material-icons">insert_drive_file</FontIcon>}/>
                {this.state.presentation}
            </Chip>
        ) : (
            <Upload
                label="Прикрепить презентацию"
                onFileLoad={this.onFileLoad.bind(this)}
                className="stageFilesUpload"
                icon={<FontIcon className="material-icons">attach_file</FontIcon>}
            />
        );
    }
}