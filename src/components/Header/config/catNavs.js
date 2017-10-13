const catNavs = [
  {
    name: 'myfunds',
    url: '/MyFunds.aspx',
    title: '我的基金',
    external: true,
    subItems: [
      {
        name: 'myInvestment',
        url: '/myInvestment/myInvestment.aspx?ga=nav',
        title: '投資組合分析',
        external: true,
      },
      {
        name: 'calcmyfundHTML5',
        url: '/calcmyfundHTML5.aspx?ga=nav',
        title: '基金透視鏡 ',
        external: true,
      },
    ],
  },
  {
    name: 'search',
    url: '/search/',
    title: '基金搜尋',
  },
  {
    name: 'ranking',
    url: '/ranking/index.htm?ga=nav',
    title: '基金排行',
    external: true,
    subItems: [
      {
        name: 'sector-ranking',
        url: '/sector-ranking/index.htm?ga=nav',
        title: '組別分類排行',
        external: true,
      },
      {
        name: 'sector-ranking-yearly',
        url: '/sector-ranking-yearly/index.htm?ga=nav',
        title: '組別年度績效排行',
        external: true,
      },
      {
        name: 'popylar-ranking',
        url: '/popular/index.htm?ga=nav',
        title: '熱門基金排行',
        external: true,
      },
    ],
  },
  {
    name: 'fixedincome',
    url: '/Fixedincome/',
    title: '債券專區',
    external: true,
    subItems: [
      {
        name: 'fixed-income',
        url: '/Fixedincome/index.aspx',
        title: '債券基金排行',
        external: true,
      },
      {
        name: 'fixed-income-search',
        url: '/Fixedincome/search.aspx',
        title: '債券基金搜尋器',
        external: true,
      },
    ],
  },
  {
    name: 'dividend',
    url: '/dividend/index.htm',
    title: '配息專區',
    external: true,
  },
  {
    name: 'report',
    url: '/report/report/index.htm',
    title: '研究報告',
    external: true,
    subItems: [
      {
        name: 'manager-view',
        url: '/report/manager/index.htm?ga=nav',
        title: '經理人訪談',
        external: true,
      },
      {
        name: 'fidelity-aasia-bond',
        url: 'http://campaign.cnyes.com/FidelityAsiaBond/?ga=nav',
        title: '亞債新視野',
        external: true,
      },
      {
        name: 'moring-star',
        url: '/report/MorningStar/index.htm?ga=nav',
        title: '晨星專欄',
        external: true,
      },
      {
        name: 'cnyes-radar',
        url: '/report/cnyes/index.htm?ga=nav',
        title: '鉅亨投資雷達',
        external: true,
      },
    ],
  },
  {
    name: 'fundsyes',
    url: 'https://www.fundsyes.com/?utm_source=cnyes&utm_medium=fundchannel_menu2',
    title: '基金交易平台',
    external: true,
  },
];

export default catNavs;
