import React from 'react';
import ReactDOM from 'react-dom/server';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AllConfig from './components/Header/config/AllConfig';

const allHeaders = Object.keys(AllConfig).reduce((previous, keyName) => {
  return {
    ...previous,
    [`${keyName}Header`]: ReactDOM.renderToString(
      <Header
        catNavs={AllConfig[keyName].catNavs}
        channel={AllConfig[keyName].name}
        enableFixedHeader={false}
        fixedHeaderType="FIXED_HEADER_FULL"
        location={{ pathname: '/' }}
        navs={AllConfig[keyName].navs}
        newsBaseUrl="http://news.cnyes.com"
        stickySubHeader={false}
      />
    ),
  };
}, {});

module.exports = function render() {
  return {
    ...allHeaders,
    footer: ReactDOM.renderToString(<Footer now={new Date().getTime()} />),
  };
};
