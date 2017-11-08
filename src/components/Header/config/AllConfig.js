import * as FundConfig from './fund/FundConfig';
import * as DesktopConfig from './desktop/DesktopConfig';
import * as TwstockConfig from './twstock/TwstockConfig';
import * as ForexConfig from './forex/ForexConfig';
import * as GlobalConfig from './global/GlobalConfig';
import * as MoneyConfig from './money/MoneyConfig';
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
  twstock: {
    name: '台股',
    navs: TwstockConfig.navs,
    catNavs: TwstockConfig.catNavs,
  },
  forex: {
    name: '外匯',
    navs: ForexConfig.navs,
    catNavs: ForexConfig.catNavs,
  },
  global: {
    name: '全球市場',
    navs: GlobalConfig.navs,
    catNavs: GlobalConfig.catNavs,
  },
  money: {
    name: '理財',
    navs: MoneyConfig.navs,
    catNavs: MoneyConfig.catNavs,
  },
  index: {
    name: '首頁',
    displayChannelName: false,
    navs: IndexConfig.navs,
  },
};

export default config;
