import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css'

const derivedAttributes = {
  "ФИО": (intern)=>{
    return `${intern.lastname} ${intern.firstname} ${intern.middlename}`;
  },
  "Дирекция": (intern)=>{
    return intern.direction ? intern.direction.name : "";
  },
  "Наставник": (intern)=>{
    return intern.tutor;
  },
  "ВУЗ": (intern)=>{
    let lastEducation = intern.educations[intern.educations.length - 1];
    return lastEducation ? lastEducation.university : "";
  }
};

export default class ReportsPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render(){
    const { loading, listExists, interns } = this.props;

    if (!listExists) {
      return <NotFoundPage />;
    }

    return loading ?
      <Message title={i18n.__('pages.ReportsPage.loading')} /> :
      <PivotTableUI data={interns} derivedAttributes={derivedAttributes} onChange={s => this.setState(s)} {...this.state}/>
  }
}