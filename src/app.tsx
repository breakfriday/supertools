import * as React from 'react';
import { runApp, IAppConfig } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';

// 脏代码，待mpa
try {
  chrome.devtools.panels.create('super_tools', 'images/grey_128.png', 'app.html', (panel) => {

  });
} catch (e) {
  console.log(e);
}


// 创建自定义侧边栏


const locale = getLocale();

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    ),
  },
};
runApp(appConfig);
