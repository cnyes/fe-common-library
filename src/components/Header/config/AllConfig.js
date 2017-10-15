import * as FundConfig from './fund/FundConfig';
import * as DesktopConfig from './desktop/DesktopConfig';

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
};

export default config;
