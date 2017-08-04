import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import ListHeader from '../components/ListHeader.jsx';
import TodoItem from '../components/TodoItem.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class InternsPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { editingTodo: null });
    this.onEditingChange = this.onEditingChange.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editingTodo: editing ? id : null,
    });
  }

  render() {
    const { loading, listExists, interns } = this.props;
    const { editingTodo } = this.state;

    if (!listExists) {
      return <NotFoundPage />;
    }

    let Interns;
    if (!interns || !interns.length) {
        Interns = (
        <Message
          title={i18n.__('pages.InternsPage.noInterns')}
          subtitle={i18n.__('pages.InternsPage.addAbove')}
        />
      );
    } else {
        Interns = interns.map(todo => (
        <TodoItem
          todo={todo}
          key={todo._id}
          editing={todo._id === editingTodo}
          onEditingChange={this.onEditingChange}
        />
      ));
    }

    return (
      <div className="page lists-show">
        <div className="content-scrollable list-items">
          {loading
            ? <Message title={i18n.__('pages.listPage.loading')} />
            : Interns}
        </div>
      </div>
    );
  }
}

InternsPage.propTypes = {
  loading: React.PropTypes.bool,
  listExists: React.PropTypes.bool,
  interns: React.PropTypes.array,
};
