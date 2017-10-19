/* eslint-disable no-multi-spaces */

const navs = [
  {
    title: '首頁',
    url: 'http://www.cnyes.com/index.htm',
  },
  {
    title: '新聞',
    url: 'http://news.cnyes.com/',
  },
  {
    title: '台股',
    url: 'http://www.cnyes.com/twstock/index.htm',
    catSlug: 'tw_stock',
    leftList: [
      { title: '台指期', url: 'http://www.cnyes.com/twstock/index.htm' },
      { title: '選擇權', url: 'http://www.cnyes.com/twstock/index.htm' },
      { title: '權證', url: 'http://www.cnyes.com/warrant/tw/index.htm' },
      { title: '興櫃', url: 'http://www.cnyes.com/presh/index.htm' },
      { title: '未上市', url: 'http://www.cnyes.com/pre/index.htm' },
    ],
  },
  {
    title: '股市Talk',
    url: 'https://stock.cnyes.com/',
  },
  {
    title: '外匯',
    url: 'http://www.cnyes.com/forex/index.htm',
    catSlug: 'forex',
    leftList: [
      { title: '新聞', url: '/news/cat/forex' },
      { title: '即時報價', url: 'http://traderoom.cnyes.com/global/forex.aspx' },
      { title: '看盤室', url: 'http://www.cnyes.com/forex/forex_index.aspx' },
      { title: '主要匯價', url: 'http://www.cnyes.com/forex/major.aspx' },
      { title: '交叉匯率', url: 'http://www.cnyes.com/forex/forex_list.aspx' },
      { title: '新台幣', url: 'http://www.cnyes.com/forex/twd.aspx' },
      { title: '人民幣', url: 'http://www.cnyes.com/forex/rmb.htm' },
      { title: '日元', url: 'http://www.cnyes.com/forex/jpy.htm' },
      { title: '歐元', url: 'http://www.cnyes.com/forex/eur.htm' },
    ],
  },
  {
    title: '全球市場',
    url: 'http://www.cnyes.com/global/IndexImmediateQuotedPrice/',
    catSlug: 'wd_stock',
    leftList: [
      { title: '國際股', url: 'http://www.cnyes.com/global/IndexImmediateQuotedPrice/' },
      { title: '美股', url: 'http://www.cnyes.com/USASTOCK/index.htm' },
      { title: '港股', url: 'http://www.cnyes.com/hkstock/index.htm' },
      { title: '滬深股', url: 'http://www.cnyes.com/shstock/index.htm' },
      { title: '日股', url: 'http://www.cnyes.com/JP/index.htm' },
      { title: '國際期貨', url: 'http://www.cnyes.com/futures/index.htm' },
      { title: '債券', url: 'http://www.cnyes.com/bond/index.htm' },
      { title: '黃金', url: 'http://www.cnyes.com/gold/index.htm' },
      { title: '全球央行', url: 'http://www.cnyes.com/CentralBank/index.htm' },
      { title: '經濟指標', url: 'http://www.cnyes.com/economy/indicator/Page/schedule.aspx' },
      { title: 'StockQ', url: 'http://money.cnyes.com/StockQ.aspx' },
    ],
  },
  {
    title: '基金',
    url: 'http://fund.cnyes.com/index.htm',
    catSlug: 'fund',
    leftList: [
      { title: '我的基金', url: 'http://fund.cnyes.com/MyFunds.aspx' },
      { title: '基金搜尋', url: 'http://fund.cnyes.com/Search.aspx' },
      { title: '基金排行', url: 'http://fund.cnyes.com/ranking/index.htm' },
      { title: '債券專區', url: 'http://fund.cnyes.com/Fixedincome/' },
      { title: '配息專區', url: 'http://fund.cnyes.com/dividend/index.htm' },
      { title: '研究報告', url: 'http://fund.cnyes.com/report/report/index.htm' },
      { title: '基金交易平台', url: 'https://www.fundsyes.com/?utm_source=cnyes&utm_medium=index_menu' },
    ],
  },
  {
    title: '交易',
    url: '',
    leftList: [
      { title: '基金交易', url: 'https://www.fundsyes.com/Index.aspx?utm_source=cnyes&utm_medium=channel_mainpage' },
    ],
    rightListTitle: '鉅亨基金交易平台',
    rightList: [
      { title: '交易登入', url: 'https://www.fundsyes.com/Login.aspx?utm_source=cnyes&utm_medium=channel_login' },
      {
        title: '免費開戶',
        url: 'https://www.fundsyes.com/launch/fund_index.htm?utm_source=cnyes&utm_medium=channel_newuser',
      },
      {
        title: '最新優惠',
        url: 'https://www.fundsyes.com/Guide/Expenses.aspx?utm_source=cnyes&utm_medium=channel_preferential',
      },
      {
        title: '投資雷達',
        url: 'https://www.fundsyes.com/Tool/SuggestionList.aspx?utm_source=cnyes&utm_medium=channel_radar',
      },
    ],
  },
  {
    title: '理財',
    url: 'http://www.cnyes.com/money/index.htm',
    catSlug: 'tw_money',
    leftList: [
      { title: '銀行服務', url: 'http://www.cnyes.com/money/BankService.aspx' },
      { title: '房貸', url: 'http://cnyes.com/mortgage' },
      { title: '投資分析', url: 'http://www.cnyes.com/money/fundptcalcu.aspx' },
      { title: '民生物價', url: 'http://www.cnyes.com/money/livelihoodPrice.htm' },
      { title: '試算工具', url: 'http://www.cnyes.com/money/BankCalculation.aspx' },
      { title: '理財新聞', url: '/news/cat/tw_money' },
      { title: '理財雜誌', url: 'http://mag.cnyes.com/Column/financial/index.shtml' },
      { title: '固定收益', url: 'http://www.cnyes.com/fixedincome/index.htm' },
      { title: '保險', url: 'http://www.cnyes.com/insurance/index.htm' },
      { title: '租賃', url: 'http://www.cnyes.com/leases/index.htm' },
      { title: '股市地圖', url: 'http://www.cnyes.com/globalinvest/GlobalStock.htm' },
    ],
  },
  {
    title: '海外房產',
    url: 'http://house.cnyes.com/global/',
    catSlug: 'cnyeshouse',
    leftList: [
      { title: '馬來西亞', url: 'http://house.cnyes.com/global/malaysia/default.aspx' },
      { title: '日本', url: 'http://house.cnyes.com/global/japan/' },
      { title: '泰國', url: 'http://house.cnyes.com/global/thailand/' },
      { title: '柬埔寨', url: 'http://house.cnyes.com/global/Cambodia/' },
      { title: '澳洲', url: 'http://house.cnyes.com/global/Australia/' },
      { title: '美國', url: 'http://house.cnyes.com/global/American/' },
      { title: '台灣', url: 'http://house.cnyes.com/' },
      { title: '房地產新聞', url: 'http://house.cnyes.com/News/' },
    ],
  },
  {
    title: '部落格',
    url: 'http://blog.cnyes.com/',
    leftList: [
      { title: '名家專區', url: 'http://blog.cnyes.com/Excerpt.aspx' },
      { title: '人氣排行榜', url: 'http://blog.cnyes.com/SearchBlog.aspx?Purpose=Hit&ga=nav' },
      { title: '最新文章', url: 'http://blog.cnyes.com/WorldFresh.aspx' },
    ],
  },
  {
    title: '主題投資',
    url: 'http://theme.cnyes.com/fund/index.html',
  },
];

export default navs;
