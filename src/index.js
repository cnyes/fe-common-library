import React from 'react';
import ReactDOM from 'react-dom/server';
import Footer from './components/Footer/Footer';

module.exports = function render() {
  return {
    footer: ReactDOM.renderToString(<Footer />),
  };
};
