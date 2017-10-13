/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import styles from './Footer.scss';
import footerLinks from './links';

class Footer extends PureComponent {
  static propTypes = {
    now: PropTypes.number.isRequired,
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
      <div className={styles['social-item']} key={`footer-socials-${item.name}`}>
        <div className={styles.title}>{item.title}</div>
        <a
          className={`${styles['social-icon']} ${styles[item.name]}`}
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
    const { now } = this.props;
    const thisYear = new Date(now).getFullYear();

    /* eslint-disable jsx-a11y/accessible-emoji */
    return (
      <div id={styles.wrapper} className={cx('theme-footer-wrapper')}>
        <footer className={styles['main-footer']}>
          <div className={styles.logo}>
            <Link to="/" />
          </div>
          <div className={styles.nav}>
            <nav>{this.constructor.renderNavs()}</nav>
            <small className={styles.copyright}>
              © Copyright 2000-{thisYear} cnYES.com All rights reserved. 未經授權 不得轉載
            </small>
            <span className={styles.statement}>
              <a href="https://news.cnyes.com/news/id/3919817" target="_blank" rel="noopener noreferrer">
                鉅亨網重大聲明
              </a>
            </span>
          </div>
          <div className={styles.socials}>{this.constructor.renderSocials()}</div>
        </footer>
      </div>
    );
  }
}

export default Footer;
