/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React, { Component, PropTypes } from 'react';
import idx from 'idx';
import classNames from 'classnames';
import { Link } from 'react-router';
import { requestType } from '../../utils/propTypes';
import styles from './Header.scss';
import NewsPlaceholder from './HeaderNavNewsPlaceholder/Row';

const EMPTY_ARRAY = [];

const itemType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

const style = {
  narrowedPopup: {
    width: '120px',
    height: 'auto',
    overflow: 'visible',
  },
  narrowedList: {
    height: 'auto',
  },
};

function renderList(list, baseUrl) {
  const content = (list || EMPTY_ARRAY).map(item => {
    return baseUrl.length ? (
      <a
        key={item.newsId}
        href={`${baseUrl}/news/id/${item.newsId}`}
        title={item.title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title}
      </a>
    ) : (
      <Link key={item.newsId} to={{ pathname: `/news/id/${item.newsId}` }} title={item.title}>
        {item.title}
      </Link>
    );
  });

  return (
    <nav className={classNames(styles['news-list'], 'theme-news-list')}>
      <h5>新聞頭條</h5>
      {!content.length ? <NewsPlaceholder /> : content}
    </nav>
  );
}

function renderStaticList(list, className, wrapperStyle, listTitle) {
  const content = list.map(({ url, title, icon }, id) => {
    if (url && url[0] === '/') {
      return (
        <Link
          key={id} // eslint-disable-line react/no-array-index-key
          to={{ pathname: url }}
          className={icon ? styles[`icon-${icon}`] : null}
          title={title}
        >
          {title}
        </Link>
      );
    }

    return (
      <a
        key={id} // eslint-disable-line react/no-array-index-key
        href={url}
        className={icon ? styles[`icon-${icon}`] : null}
        title={title}
      >
        {title}
      </a>
    );
  });

  return (
    <nav className={className} style={wrapperStyle || {}}>
      {listTitle && <h5>{listTitle}</h5>}
      {content}
    </nav>
  );
}

export default class SubMenu extends Component {
  static propTypes = {
    // ownProps
    /* tab label */
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    catSlug: PropTypes.string,
    /* Menu */
    leftList: PropTypes.arrayOf(itemType),
    leftListTitle: PropTypes.string,
    rightList: PropTypes.arrayOf(itemType),
    rightListTitle: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    newsBaseUrl: PropTypes.string.isRequired,
    request: requestType,
  };

  static defaultProps = {
    className: '',
    catSlug: undefined,
    leftList: undefined,
    leftListTitle: undefined,
    rightList: undefined,
    rightListTitle: undefined,
    newsBaseUrl: '',
    request: undefined,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      list: [],
    };
  }

  loadNewsByCat = () => {
    const { catSlug, request } = this.props;

    if (!catSlug || !request) {
      return;
    }
    const api = `/api/v3/news/category/${catSlug}?isCategoryHeadline=1&limit=30`;

    request.get(api).then(
      response => {
        const list = idx(response, _ => _.data.items.data) || [];

        this.setState({ list });
      },
      error => {
        if (__DEVELOPMENT__) {
          console.error(error);
        }
      }
    );
  };

  renderPopupMenu() {
    const { leftList, leftListTitle, catSlug, rightList, rightListTitle, newsBaseUrl, request } = this.props;
    const { list } = this.state;
    const isOnlyLeft = (!catSlug && !rightList) || (catSlug && !request);

    if (!leftList && isOnlyLeft) {
      // no left and no right, => no popup menu
      return null;
    }

    return (
      <div className={classNames(styles.popup, 'theme-popup')} style={(isOnlyLeft && style.narrowedPopup) || {}}>
        {leftList &&
          renderStaticList(
            leftList,
            classNames(styles['link-wrapper'], 'theme-link-wrapper'),
            isOnlyLeft && style.narrowedList,
            leftListTitle
          )}
        {catSlug && request && renderList(list, newsBaseUrl)}
        {!catSlug &&
          rightList &&
          renderStaticList(rightList, classNames(styles['news-list'], 'theme-news-list'), undefined, rightListTitle)}
      </div>
    );
  }

  render() {
    const { url, title, className, leftList, catSlug, rightList } = this.props;
    const isOnlyLeft = !catSlug && !rightList;

    return (
      <div className={className} onMouseEnter={this.loadNewsByCat}>
        {url.length ? (
          <a href={url} className={styles['submenu-title']}>
            {title}
            {(leftList || !isOnlyLeft) && <span className={styles['with-arrow']} />}
          </a>
        ) : (
          <span className={styles['submenu-title']}>
            {title}
            {(leftList || !isOnlyLeft) && <span className={styles['with-arrow']} />}
          </span>
        )}
        {this.renderPopupMenu()}
      </div>
    );
  }
}
