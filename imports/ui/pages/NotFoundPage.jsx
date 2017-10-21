import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import Message from '../components/Message.jsx';

class NotFoundPage extends BaseComponent {
  render() {
    return (
      <div className="page not-found">
        <div className="content-scrollable">
          <Message title={i18n.__('pages.notFoundPage.pageNotFound')} />
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
