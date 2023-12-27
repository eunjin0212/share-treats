'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin');

function loadPages() {
  const outPage = {}
  const appPages = require('./app.pages.js')
  const pageEnum = Object.keys(appPages)

  pageEnum.forEach(pEnum => {
    const pageInfo = appPages[pEnum]
    const pEnums = pEnum.split('/')
    const lastPage = pEnums[pEnums.length - 1]
    outPage[pEnum] = {
      entry: pEnum === 'index' ? './src/main.js' : `./src/pages/${pEnum}/${lastPage}.js`,
      template: pageInfo.template || 'public/templates/default.html',
      title: pageInfo.title || 'STIC V3 Project',
      chunks: ['chunk-vendors', 'chunk-common', pEnum]
    }
  })
  return outPage
}

const importPages = loadPages()
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  indexPath: 'index.html',
  lintOnSave: false,
  pages: importPages,
  configureWebpack: config => {
    var isProd = process.env.NODE_ENV === 'production';
    if (isProd) {
      config.output.pathinfo = false;
      config.output.libraryExport = 'default';
      config.optimization.removeAvailableModules = true;
      config.optimization.removeEmptyChunks = true;
    } else {
      // Development mode
    }

    const plugins = config.plugins;
    for (const p in plugins) {
      const ppp = plugins[p];
      if (ppp instanceof HtmlWebpackPlugin) {
        // Feature : userOptions > filename > 'employees/invited_employees.html' to 'employees/invited_employees/index.html
        /*
        userOptions: {
          title: 'Employees',
          scriptLoading: 'defer',
          templateParameters: [Function: templateParameters],
          chunks: [ 'chunk-vendors', 'chunk-common', 'employees/invited_employees' ],
          template: 'public/default.html',
          filename: 'employees/invited_employees.html'
        }
        */
        const oldName = ppp.userOptions.filename;
        if (oldName === 'index.html') {
          continue;
        }
        const tokens = oldName.split("/");
        const lastHtmlName = tokens[tokens.length - 1];
        const prefixHtmlName = lastHtmlName.substr(0, lastHtmlName.length - (5 /* 5: .html*/));
        const finalHtmlName = prefixHtmlName + '/index.html';
        tokens[tokens.length - 1] = finalHtmlName;

        ppp.userOptions.filename = tokens.join('/');
      }
    }
  },
  transpileDependencies: true
}