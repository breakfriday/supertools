// const path = require('path');

// const APP_DIR = path.resolve(__dirname, './src');
// const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');

module.exports = {
  vite: false,
  outputDir: 'build',
  vendor: false,
  entry: {
    app: 'src/app',
    background: 'src/background/index',

  },
  outputAssetsPath: {
    js: 'js',
    css: 'css',
  },
  publicPath: './',
  hash: false,
  sourceMap: true,

  modeConfig: {
    local: {
      hash: false,
      publicPath: 'https://localhost:3333',
    },

  },

  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  polyfill: false,
  minify: false,

  plugins: [

    [
      'build-plugin-css-assets-local',
      {
        outputPath: 'assets_resource',
        relativeCssPath: '../',
      },
    ],

    [
      'build-plugin-icestark',
      {
        type: 'framework',
      },
    ],
    [
      'build-plugin-fusion',
      {
        disableModularImport: true,
        themePackage: '@alifd/theme-design-pro',
        themeConfig: {
          'css-prefix': 'next-icestark-',
        },
      },
    ],
    [
      'build-plugin-moment-locales',
      {
        locales: [
          'zh-cn',
        ],
      },
    ],
    [
      'build-plugin-ignore-style',
      {
        libraryName: '@alifd/next',
      },
    ],
  ],
  //   webpackLoaders: {
  //     css: [{
  //       test: /\.css$/,
  //       include: APP_DIR,
  //       loaders: {
  //         'style-loader': { },
  //         'css-loader': {
  //           options: {
  //             modules: true,
  //             namedExport: true,
  //           },
  //         },
  //       },
  //     }, {
  //       test: /\.css$/,
  //       include: MONACO_DIR,
  //       loaders: {
  //         'style-loader': {},
  //         'css-loader': {},
  //       },
  //     }],

  //   },
  webpackPlugins: {
    'monaco-editor-webpack-plugin': {
      options: {
        identifier: 'module1',
        languages: ['json'],
      },
    },
  },
};

