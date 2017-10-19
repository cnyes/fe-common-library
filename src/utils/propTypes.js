/* eslint-disable import/prefer-default-export */
import { PropTypes } from 'react';

export const requestType = PropTypes.func;

export const navUrlShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const navItemShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  catSlug: PropTypes.string,
  leftList: PropTypes.arrayOf(navUrlShape),
  rightListTitle: PropTypes.string,
  rightList: PropTypes.arrayOf(navUrlShape),
});

export const navsType = PropTypes.arrayOf(navItemShape);

export const catNavSubItemShape = PropTypes.shape({
  name: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  external: PropTypes.bool,
});

export const catNavItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  external: PropTypes.bool,
  subItems: PropTypes.arrayOf(catNavSubItemShape),
});

export const catNavsType = PropTypes.arrayOf(catNavItemShape);
