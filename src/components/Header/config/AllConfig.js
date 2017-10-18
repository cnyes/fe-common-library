import * as FundConfig from './fund/FundConfig';
import * as DesktopConfig from './desktop/DesktopConfig';
import * as ExmpleConfig from './example/ExampleConfig';

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
  example: {
    name: '首頁',
    disableName: true,
    navs: ExmpleConfig.navs,
  },
};

export default config;
