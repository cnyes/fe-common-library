# Common Library and Component @cnyes fedev

## Import to React base project

### Header and Footer

```
import { Header, Footer } from 'fe-common-library';
import 'fe-common-library/dest/lib.css'
```

## Export html/style for general website

### Steps

1. Install bundle tools and dependencies
2. Set configs for Header
3. Export html/style and get static files
4. Test and Debug

### 1. Install bundle tools and dependencies

Use `npm` or `yarn` to install `webpack` and other dependencies

```
$ npm install webpack -g
$ npm install
```

### 2. Prepare configs for Nav Items

Before exporting html/style, we need to prepare configs in `src/components/Header/config/AllConfig.js`, such as channel name and navigation items, to generate proper html for each channel.

A channel config will look like the following, please feel free to extend it as you want:
```
fund: {
  name: '基金',
  navs: FundConfig.navs,
  catNavs: FundConfig.catNavs,
},
```

	* `name` is channel name, it will show on the right of header logo.
	* `catNavs` are main channels in main header
	* `navs` are navs in sub-header. Or you can set `null` to hide sub-header.

### 3. Export html/style and get static files

Open the command line and go to the root of the project.
And use `npm build:common` or `yarn` to export html and styles.

```
$ npm run build:common
```

Finished successfully, open `/static/dist/` and you will get css, js, and html files for each channel.
Now you can use them in your own projects.

### 4. Test and Debug

There is a chrome extension for test.
https://chrome.google.com/webstore/detail/cnyes-common-header-foote/nbanalfdjhbgmcbflgfjbfchkplgbgin?hl=zh-TW&authuser=2

You can use it to upload the `dist/` folder to preview the change on your sites.

It is only available at cnYes 首頁 / 台股 / 國際股 / 外匯.