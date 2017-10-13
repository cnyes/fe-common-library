import React from 'react';
import ReactDOM from 'react-dom/server';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import navs from './components/Header/config/navs';
import catNavs from './components/Header/config/catNavs';

module.exports = function render() {
  return {
    header: ReactDOM.renderToString(
      <Header
        catNavs={catNavs}
        channel="基金"
        enableFixedHeader={false}
        fixedHeaderType="FIXED_HEADER_FULL"
        location={{ pathname: '/' }}
        navs={navs}
        newsBaseUrl="http://news.cnyes.com"
        stickySubHeader={false}
      />
    ),
    footer: ReactDOM.renderToString(<Footer />),
  };
};
