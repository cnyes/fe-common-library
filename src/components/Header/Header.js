/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React, { PureComponent, PropTypes } from 'react';
import raf from 'raf';
import classNames from 'classnames';
import { requestType, navsType, catNavsType, locationShape } from '../../utils/propTypes';
import getStyleName from '../../utils/getStyleName';
import SubMenu from './SubMenu';
import SubNavItem from './SubNavItem';
import styles from './Header.scss';
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

function renderNavs(channel, navs, newsBaseUrl, request, Link) {
  return navs.map((nav, idx) => {
    const className = nav.title === channel ? classNames(getStyleName(styles, 'active'), 'theme-active') : '';

    /* eslint-disable react/no-array-index-key */
    return <SubMenu key={idx} className={className} {...nav} newsBaseUrl={newsBaseUrl} request={request} Link={Link} />;
    /* eslint-enable react/no-array-index-key */
  });
}

class Header extends PureComponent {
  static propTypes = {
    catNavs: catNavsType,
    channel: PropTypes.string.isRequired,
    displayChannelName: PropTypes.bool,
    fixedHeaderType: PropTypes.oneOf([FIXED_HEADER_NONE, FIXED_HEADER_FULL, FIXED_HEADER_SUB, FIXED_HEADER_SEARCH])
      .isRequired,
    location: locationShape.isRequired,
    navs: navsType.isRequired,
    newsBaseUrl: PropTypes.string.isRequired,
    request: requestType,
    stickySearchHeader: PropTypes.bool,
    stickySubHeader: PropTypes.bool,
    toggleFixedHeader: PropTypes.func.isRequired,
    Link: PropTypes.func,
  };

  static defaultProps = {
    catNavs: undefined,
    displayChannelName: true,
    fixedHeaderType: FIXED_HEADER_NONE,
    newsBaseUrl: '',
    request: undefined,
    stickySearchHeader: false,
    stickySubHeader: false,
    toggleFixedHeader: EMPTY_FUNCTION,
    Link: undefined,
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
      ? classNames(getStyleName(styles, 'sub-header'), getStyleName(styles, 'fixed'), 'theme-sub-header', 'theme-fixed')
      : classNames(getStyleName(styles, 'sub-header'), 'theme-sub-header');

    if (fixedHeaderType === FIXED_HEADER_SEARCH) {
      if (isFixed) {
        subHeaderClass = classNames(subHeaderClass, getStyleName(styles, 'hide'), 'theme-hide', 'js-hide');
      }
    } else {
      subHeaderClass =
        fixedHeaderType === (isFixed ? FIXED_HEADER_SUB : FIXED_HEADER_FULL)
          ? subHeaderClass
          : classNames(subHeaderClass, getStyleName(styles, 'hide'), 'theme-hide', 'js-hide');
    }

    subHeaderClass = classNames(subHeaderClass, 'js-header-sub-header');

    return (
      <div className={subHeaderClass}>
        <nav className={classNames(getStyleName(styles, 'cat-menu'), 'theme-cat-menu')}>{this.renderCatMenu()}</nav>
      </div>
    );
  }

  renderCatMenu() {
    const { catNavs, location, Link } = this.props;
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
          Link={Link}
        />
      );
    });
  }

  renderSearch() {
    return (
      <form
        acceptCharset="UTF-8"
        action="https://so.cnyes.com/cnyessearch.aspx"
        className={getStyleName(styles, 'header-search')}
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
    const { catNavs, channel, displayChannelName, navs, newsBaseUrl, request, Link } = this.props;

    return (
      <div id={getStyleName(styles, 'cnyes-header-wrapper')} className={classNames('theme-wrapper', 'theme-header')}>
        <header className={classNames(getStyleName(styles, 'main-header'), 'theme-main-header')}>
          <div className={getStyleName(styles, 'header-menu')}>
            <span className={getStyleName(styles, 'logo-wrapper')}>
              <a href="http://www.cnyes.com/" className={getStyleName(styles, 'logo')} />
              {displayChannelName &&
                (Link ? (
                  <Link to="/" className={getStyleName(styles, 'channel-label')}>
                    {channel}
                  </Link>
                ) : (
                  <a href="/" className={getStyleName(styles, 'channel-label')}>
                    {channel}
                  </a>
                ))}
            </span>
            <span className={getStyleName(styles, 'actions')}>
              <ul className={getStyleName(styles, 'user-nav')}>
                <li>
                  <a href="https://www.facebook.com/cnYES/" target="_blank" rel="noopener noreferrer">
                    粉絲團
                  </a>
                </li>
              </ul>
              {this.renderSearch()}
            </span>
          </div>
          <nav>{renderNavs(channel, navs, newsBaseUrl, request, Link)}</nav>
        </header>
        {catNavs &&
          catNavs.length && (
            <div
              className={classNames(
                getStyleName(styles, 'subheader-wrapper'),
                this.props.fixedHeaderType === FIXED_HEADER_SUB && getStyleName(styles, 'fixed')
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
