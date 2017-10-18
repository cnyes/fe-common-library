import * as FundConfig from './fund/FundConfig';
import * as DesktopConfig from './desktop/DesktopConfig';
import * as IndexConfig from './index/IndexConfig';

const config = {
  fund: {
    name: '基金',
    navs: FundConfig.navs,
    catNavs: FundConfig.catNavs,
  },
  desktop: {
    name: '新聞',
    navs: DesktopConfig.navs,
    catNavs: DesktopConfig.catNavs,
  },
  index: {
    name: '首頁',
    displayChannelName: false,
    navs: IndexConfig.navs,
  },
};

export default config;
