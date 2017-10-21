import React from 'react';
import { Link } from 'react-router';
import BaseComponent from './BaseComponent.jsx';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Group from 'material-ui/svg-icons/social/group';

export default class MainMenu extends BaseComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Link
                    to={`/interns/`}
                    title="Список стажеров"
                    className="list-todo"
                    activeClassName="active"
                >
                    <MenuItem leftIcon={<PersonAdd/>}>Список стажеров</MenuItem>
                </Link>
                <MenuItem leftIcon={<ContentCopy/>}>Отчеты</MenuItem>
                <Divider/>
                <Link
                    to={`/users/`}
                    title="Список пользователей"
                    className="users"
                    activeClassName="active"
                >
                    <MenuItem leftIcon={<Group/>}>Список пользователей</MenuItem>
                </Link>
            </div>
        )
    }
}