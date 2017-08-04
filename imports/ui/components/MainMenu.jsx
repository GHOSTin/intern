import React from 'react';
import { Link } from 'react-router';
import BaseComponent from './BaseComponent.jsx';

export default class MainMenu extends BaseComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <ul className="nav list-todos" id="side-menu">
                <Link
                    to={`/interns/`}
                    title="Список стажеров"
                    className="list-todo"
                    activeClassName="active"
                >
                    Список стажеров
                </Link>
            </ul>
        )
    }
}