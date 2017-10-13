import React from 'react';
import ReactDOM from 'react-dom/server';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

module.exports = function render() {
  return {
    header: ReactDOM.renderToString(
      <Header
        fixedHeaderType="FIXED_HEADER_FULL"
        enableFixedHeader={false}
        stickySubHeader={false}
        newsBaseUrl="http://news.cnyes.com"
        location={{ pathname: '/' }}
      />
    ),
    footer: ReactDOM.renderToString(<Footer />),
  };
};
