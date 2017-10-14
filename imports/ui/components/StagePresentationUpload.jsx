import React from "react";
import BaseComponent from '../components/BaseComponent.jsx';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Upload from 'material-ui-upload/Upload';

import {Presentation} from '/imports/api/stages/common.js';

const style = {
    chip: {
        margin: 4
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
};


export default class StagePresentation extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            presentation: ""
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            presentation: props.presentation?Presentation.find({_id:props.presentation}).fetch():null
        });
    }

    onFileLoad(e, file){
        Presentation.insert(file, (error, fileObj)=>{
            this.props.changeHandler(fileObj._id);
        })
    }

    handleRequestDelete(){
        Presentation.remove(this.props.presentation, (error, fileObj)=>{
            this.props.changeHandler("");
        })
    }

    render(){
        return this.props.presentation?(
            <Chip style={style.chip} onRequestDelete={this.handleRequestDelete.bind(this)}>
                <Avatar icon={<FontIcon className="material-icons">insert_drive_file</FontIcon>}/>
                {this.props.presentation?this.state.presentation.original.name:""}
            </Chip>
        ):(
            <Upload
                label="Прикрепить презентацию"
                onFileLoad={this.onFileLoad.bind(this)}
                className="stageFilesUpload"
                icon={<FontIcon className="material-icons">attach_file</FontIcon>}
            />
        );
    }
}