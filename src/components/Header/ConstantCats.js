/* eslint-disable import/prefer-default-export */
// prod: http://news.cnyes.cool/api/v3/categories
import CategoriesRawProd from './raw/CategoriesProd.raw.json'; // eslint-disable-line import/no-named-as-default
import CategoriesRawBeta from './raw/CategoriesBeta.raw.json'; // eslint-disable-line import/no-named-as-default

const CategoriesRaw = process.env.NODE_ENV === 'production' ? CategoriesRawProd : CategoriesRawBeta;

const BASE_CATEGORIES = [
  {
    slug: 'all',
    categoryId: 'all',
    name: '總覽',
    parentId: 0,
    parentSlug: '',
    api: '/api/v2/news',
    subs: null,
  },
  {
    slug: 'headline',
    categoryId: 'headline',
    name: '即時頭條',
    parentId: 0,
    parentSlug: '',
    api: '/api/v3/news/category/headline',
    subs: null,
  },
  {
    slug: 'news24h',
    categoryId: 'news24h',
    name: '24HR',
    parentId: 0,
    parentSlug: '',
    api: '/api/v1/news/24h',
    subs: null,
  },
  {
    slug: 'popular',
    categoryId: 'popular',
    name: '人氣',
    parentId: 0,
    parentSlug: '',
    api: '/api/v1/news/popular',
    subs: null,
  },
];
const Categories = [...BASE_CATEGORIES, ...CategoriesRaw.items];

export const CategoryMappingWithSubs = Categories.reduce((pValue, cValue, cIndex, cats) => {
  const cat = cats[cIndex];
  let subs = null;
  let parentSlug = '';

  // build subs
  if (cat.parentId === 0) {
    subs = Categories.reduce((previousValue, currentValue, currentIndex, array) => {
      const subCat = array[currentIndex];

      if (subCat.parentId === cat.categoryId) {
        previousValue.push(subCat.slug);
      }

      return previousValue;
    }, []);

    subs = subs.length > 0 ? subs : null;
  } else {
    // find parent's slug
    const parentCat = Categories.filter(_cat => {
      return _cat.categoryId === cat.parentId;
    });

    if (parentCat && parentCat.length > 0) {
      parentSlug = parentCat[0].slug;
    }
  }

  const result = {
    ...cat,
    parentSlug,
    subs,
  };

  pValue[cat.slug] = result; // eslint-disable-line no-param-reassign

  return pValue;
}, {});
