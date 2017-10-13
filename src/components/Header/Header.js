/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import { locationShape } from 'react-router/lib/PropTypes';
import raf from 'raf';
import classNames from 'classnames';
import { requestType, navsType, catNavsType } from './propTypes';
import SubMenu from './SubMenu';
import SubNavItem from './SubNavItem';
import styles from './Header.scss';
// import navs from './config/navs';
import { CategoryMappingWithSubs } from './ConstantCats';
import { FIXED_HEADER_NONE, FIXED_HEADER_FULL, FIXED_HEADER_SUB, FIXED_HEADER_SEARCH } from './ConstantUI';

const DISTANCE_OVER_SUBHEADER = 80;
const EMPTY_FUNCTION = () => {};

function findCatSlugFromUrl(pathname = '') {
  const regex = /^\/(news|columnists|projects|trending|search)?\/?(\w+)?\/?(\w+)?/;
  const matches = pathname.match(regex);
  let target = null;

  if (matches) {
    if (matches[1] && matches[1] === 'columnists') {
      target = 'celebrity_area';
    } else if (matches[2] && matches[2] === 'cat') {
      target = matches[3];
    } else if (matches[1]) {
      target = matches[1];
    }
  }

  return CategoryMappingWithSubs[target] && CategoryMappingWithSubs[target].parentId !== 0
    ? CategoryMappingWithSubs[target].parentSlug
    : target;
}

function renderNavs(channel, navs, newsBaseUrl, request) {
  return navs.map((nav, idx) => {
    const className = nav.title === channel ? classNames(styles.active, 'theme-active') : '';

    /* eslint-disable react/no-array-index-key */
    return <SubMenu key={idx} className={className} {...nav} newsBaseUrl={newsBaseUrl} request={request} />;
    /* eslint-enable react/no-array-index-key */
  });
}

class Header extends PureComponent {
  static propTypes = {
    channel: PropTypes.string.isRequired,
    location: locationShape.isRequired,
    stickySubHeader: PropTypes.bool,
    stickySearchHeader: PropTypes.bool,
    fixedHeaderType: PropTypes.oneOf([FIXED_HEADER_NONE, FIXED_HEADER_FULL, FIXED_HEADER_SUB, FIXED_HEADER_SEARCH])
      .isRequired,
    toggleFixedHeader: PropTypes.func.isRequired,
    newsBaseUrl: PropTypes.string.isRequired,
    request: requestType,
    navs: navsType.isRequired,
    catNavs: catNavsType,
  };

  static defaultProps = {
    stickySubHeader: false,
    stickySearchHeader: false,
    fixedHeaderType: FIXED_HEADER_NONE,
    newsBaseUrl: '',
    request: undefined,
    catNavs: undefined,
    toggleFixedHeader: EMPTY_FUNCTION,
  };

  componentDidMount() {
    this.props.toggleFixedHeader(FIXED_HEADER_FULL);
    if (this.props.stickySubHeader) {
      window.addEventListener('scroll', this.scrollHandler);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    const scrollY = 'scrollY' in window ? window.scrollY : document.documentElement.scrollTop;
    const sticky = this.props.stickySubHeader;

    if (sticky) {
      if (scrollY >= DISTANCE_OVER_SUBHEADER && this.props.fixedHeaderType !== FIXED_HEADER_SUB) {
        this._setNextState({ fixedHeaderType: FIXED_HEADER_SUB });
      } else if (scrollY < DISTANCE_OVER_SUBHEADER && this.props.fixedHeaderType === FIXED_HEADER_SUB) {
        this._setNextState({ fixedHeaderType: FIXED_HEADER_FULL });
      }
    } else if (this.props.stickySearchHeader) {
      this._setNextState({ fixedHeaderType: FIXED_HEADER_SEARCH });
    } else if (scrollY >= DISTANCE_OVER_SUBHEADER) {
      this._setNextState({ fixedHeaderType: FIXED_HEADER_NONE });
    } else if (scrollY < DISTANCE_OVER_SUBHEADER) {
      this._setNextState({ fixedHeaderType: FIXED_HEADER_FULL });
    }
  };

  _setNextState = state => {
    if (this._setNextStateAnimationFrameId) {
      raf.cancel(this._setNextStateAnimationFrameId);
    }

    this._setNextStateAnimationFrameId = raf(() => {
      this._setNextStateAnimationFrameId = null;
      this.props.toggleFixedHeader(state.fixedHeaderType);
    });
  };

  renderSubHeader(isFixed = false) {
    const { fixedHeaderType } = this.props;

    // .js-* className is for e2e test
    let subHeaderClass = isFixed
      ? classNames(styles['sub-header'], styles.fixed, 'theme-sub-header', 'theme-fixed')
      : classNames(styles['sub-header'], 'theme-sub-header');

    if (fixedHeaderType === FIXED_HEADER_SEARCH) {
      if (isFixed) {
        subHeaderClass = classNames(subHeaderClass, styles.hide, 'theme-hide', 'js-hide');
      }
    } else {
      subHeaderClass =
        fixedHeaderType === (isFixed ? FIXED_HEADER_SUB : FIXED_HEADER_FULL)
          ? subHeaderClass
          : classNames(subHeaderClass, styles.hide, 'theme-hide', 'js-hide');
    }

    subHeaderClass = classNames(subHeaderClass, 'js-header-sub-header');

    return (
      <div className={subHeaderClass}>
        <nav className={classNames(styles['cat-menu'], 'theme-cat-menu')}>{this.renderCatMenu()}</nav>
      </div>
    );
  }

  renderCatMenu() {
    const { catNavs, location } = this.props;
    const activeCatSlug = findCatSlugFromUrl(location.pathname);

    return catNavs.map((nav, idx) => {
      return (
        <SubNavItem
          key={idx} // eslint-disable-line react/no-array-index-key
          url={nav.url}
          title={nav.title}
          isNew={nav.name === 'search'}
          isActive={nav.name === activeCatSlug}
          subItems={nav.subItems}
          external={nav.external}
        />
      );
    });
  }

  renderSearch() {
    return (
      <form
        acceptCharset="UTF-8"
        action="https://so.cnyes.com/cnyessearch.aspx"
        className={styles['header-search']}
        target="_blank"
      >
        <input type="hidden" name="cx" value="015486011444191663508:8ijuvgfglaq" />
        <input
          type="hidden"
          name="other"
          value=""
          ref={ref => {
            this.otherInput = ref;
          }}
        />
        <input type="hidden" name="ie" value="UTF-8" />
        <input type="hidden" name="ga" value="nav" />
        <input
          name="q"
          placeholder="請輸入關鍵詞"
          onChange={e => {
            this.otherInput.value = e.target.value;
          }}
        />
        <button type="submit" />
      </form>
    );
  }

  render() {
    const { catNavs, channel, navs, newsBaseUrl, request } = this.props;

    return (
      <div id={styles.wrapper} className={classNames('theme-wrapper', 'theme-header')}>
        <header className={classNames(styles['main-header'], 'theme-main-header')}>
          <div className={styles['header-menu']}>
            <span className={styles['logo-wrapper']}>
              <a href="http://www.cnyes.com/" className={styles.logo} />
              <Link to="/" className={styles['channel-label']}>
                {channel}
              </Link>
            </span>
            <span className={styles.actions}>
              <ul className={styles['user-nav']}>
                <li>
                  <a href="https://www.facebook.com/cnYES/" target="_blank" rel="noopener noreferrer">
                    粉絲團
                  </a>
                </li>
              </ul>
              {this.renderSearch()}
            </span>
          </div>
          <nav>{renderNavs(channel, navs, newsBaseUrl, request)}</nav>
        </header>
        {catNavs &&
          catNavs.length && (
            <div
              className={classNames(
                styles['subheader-wrapper'],
                this.props.fixedHeaderType === FIXED_HEADER_SUB && styles.fixed
              )}
            >
              {this.renderSubHeader(true)}
              {this.renderSubHeader(false)}
            </div>
          )}
      </div>
    );
  }
}

export default Header;
