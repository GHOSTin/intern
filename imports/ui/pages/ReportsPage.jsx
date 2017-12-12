import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import {derivers} from 'react-pivottable/Utilities';
import 'react-pivottable/pivottable.css'

const derivedAttributes = {
  "ФИО": (intern) => {
    return `${intern.lastname} ${intern.firstname} ${intern.middlename}`;
  },
  "Пол": (intern) => {
    let gender = {'male': "мужской", "female": "женский"}
    return gender[intern.gender];
  },
  "Дата рождения": derivers.dateFormat("birthday", "%d.%m.%y"),
  "Дирекция": (intern) => {
    return intern.direction ? intern.direction.name : "";
  },
  "Наставник": (intern) => {
    return intern.tutor;
  },
  "Табельный номер": (intern) => {
    return intern.tabel;
  },
  "ВУЗ": (intern) => {
    let lastEducation = intern.educations[intern.educations.length - 1];
    return lastEducation ? lastEducation.university : "";
  },
  "Специальность": (intern) => {
    let lastEducation = intern.educations[intern.educations.length - 1];
    return lastEducation ? lastEducation.speciality : "";
  },
  "Кафедра": (intern) => {
    let lastEducation = intern.educations[intern.educations.length - 1];
    return lastEducation ? lastEducation.department : "";
  },
  "Курс": (intern) => {
    let lastEducation = intern.educations[intern.educations.length - 1];
    return lastEducation && lastEducation.course ? `${lastEducation.course} курс` : "";
  },
  "Военнообязан": (intern) => {
    return intern.army ? "истина" : "ложь"
  }
};

const hiddenAttributes = [
  "_id", "lastname", "firstname", "middlename", "direction", "educations", "tutor",
  "avatar", "tabel", "army", "gender", "birthday", "createdAt"
];

export default class ReportsPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    const {loading, listExists, interns} = this.props;

    if (!listExists) {
      return <NotFoundPage/>;
    }

    return loading ?
        <Message title={i18n.__('pages.ReportsPage.loading')}/> :
        <PivotTableUI
            data={interns}
            hiddenAttributes={hiddenAttributes}
            hiddenFromAggregators={hiddenAttributes}
            derivedAttributes={derivedAttributes}
            onChange={s => this.setState(s)}
            {...this.state}
        />
  }
}