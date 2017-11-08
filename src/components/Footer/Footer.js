/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import getStyleName from '../../utils/getStyleName';
import styles from './Footer.scss';
import footerLinks from './links';

class Footer extends PureComponent {
  static propTypes = {
    now: PropTypes.number.isRequired,
    Link: PropTypes.func,
  };

  static defaultProps = {
    Link: undefined,
  };

  static renderNavs() {
    return footerLinks.navs.map(item => (
      <a href={item.url} key={`footer-nav-${item.name}`} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
    ));
  }

  static renderSocials() {
    return footerLinks.socials.map(item => (
      <div className={getStyleName(styles, 'social-item')} key={`footer-socials-${item.name}`}>
        <div className={getStyleName(styles, 'title')}>{item.title}</div>
        <a
          className={`${getStyleName(styles, 'social-icon')} ${getStyleName(styles, `cnyes-media-${item.name}`)}`}
          href={item.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.title}
        </a>
      </div>
    ));
  }

  render() {
    const { now, Link } = this.props;
    const thisYear = new Date(now).getFullYear();

    /* eslint-disable jsx-a11y/accessible-emoji */
    return (
      <div id={getStyleName(styles, 'cnyes-footer-wrapper')} className={cx('theme-footer-wrapper')}>
        <footer className={getStyleName(styles, 'main-footer')}>
          <div className={getStyleName(styles, 'logo')}>{Link ? <Link to="/" /> : <a href="/" />}</div>
          <div className={getStyleName(styles, 'nav')}>
            <nav>{this.constructor.renderNavs()}</nav>
            <small className={getStyleName(styles, 'copyright')}>
              © Copyright 2000-{thisYear} cnYES.com All rights reserved. 未經授權 不得轉載
            </small>
            <span className={getStyleName(styles, 'statement')}>
              <a href="https://news.cnyes.com/news/id/3919817" target="_blank" rel="noopener noreferrer">
                鉅亨網重大聲明
              </a>
            </span>
          </div>
          <div className={getStyleName(styles, 'socials')}>{this.constructor.renderSocials()}</div>
        </footer>
      </div>
    );
  }
}

export default Footer;
