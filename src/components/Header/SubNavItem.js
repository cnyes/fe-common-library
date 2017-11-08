/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import getStyleName from '../../utils/getStyleName';
import styles from './Header.scss';

function SubNavItemMenu({ items }) {
  if (!items) {
    return null;
  }
  if (!items.length) {
    return null;
  }

  return (
    <nav className={getStyleName(styles, 'cat-nav-sub-item')}>
      {items &&
        items.map(item => {
          return (
            <a key={item.name} href={item.url} title={item.title}>
              {item.title}
            </a>
          );
        })}
    </nav>
  );
}

SubNavItemMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

SubNavItemMenu.defaultProps = {
  items: undefined,
};

function SubNavItem({ url = '/', title, isNew, isActive, subItems, external = false, Link }) {
  let className = isActive ? cx(getStyleName(styles, 'active'), 'theme-active') : '';

  className = cx(className, {
    [getStyleName(styles, 'is-new')]: isNew,
    [getStyleName(styles, 'with-arrow')]: !!subItems,
  });

  return (
    <span className={getStyleName(styles, 'cat-nav-item')}>
      {external || !Link ? (
        <a className={className} href={url} title={title}>
          {title}
        </a>
      ) : (
        <Link className={className} to={{ pathname: url }} title={title}>
          {title}
        </Link>
      )}
      {subItems && <SubNavItemMenu items={subItems} />}
    </span>
  );
}

SubNavItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  isActive: PropTypes.bool,
  subItems: PropTypes.arrayOf(PropTypes.object),
  external: PropTypes.bool,
  Link: PropTypes.func,
};

SubNavItem.defaultProps = {
  isNew: false,
  isActive: false,
  subItems: undefined,
  external: false,
  Link: undefined,
};

export default SubNavItem;
