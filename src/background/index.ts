import forward from './foward-service';
import { ALL_URLS, BLOCKING, DISABLED } from './constant';
import ScenseService from '@/controller/scense_service';

import { Enabled } from './esum';

const clearCacheEnabled = true;
// let clearRunning = false;

// function clearCache(): void {
//   if (!clearRunning) {
//     clearRunning = true;
//     const millisecondsPerWeek = MILLISECONDS_PER_WEEK;
//     const oneWeekAgo = new Date().getTime() - millisecondsPerWeek;
//     chrome.browsingData.removeCache(
//       {
//         since: oneWeekAgo,
//       },
//       () => {
//         clearRunning = false;
//       },
//     );
//   }
// }


chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (forward[DISABLED] !== Enabled.NO) {
      if (clearCacheEnabled) {
        // clearCache();
      }

      return forward.onBeforeRequestCallback(details);
    }
    return {};
  },
  {
    urls: [ALL_URLS],
  },
  [BLOCKING],
);


// Breaking the CORS Limitation
// chrome.webRequest.onHeadersReceived.addListener((details) => {
//   const { responseHeaders } = details;
//   console.log('details', responseHeaders);

//   const resHeaders: chrome.webRequest.HttpHeader[] = [];

//   responseHeaders.push({ name: 'Access-Control-Allow-Origin', value: '*' });
//   responseHeaders.push({ name: 'Access-Control-Allow-Methods', value: 'PUT, POST, GET, DELETE, OPTIONS' });
//   responseHeaders.push({ name: 'Access-Control-Allow-Credentials', value: 'true' });
//   responseHeaders.push({ name: 'Access-Control-Allow-Private-Network', value: 'true' });
//   // eslint-disable-next-line max-len
//   responseHeaders.push({ name: 'Access-Control-Request-Headers', value: 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With' });

//   return { responseHeaders };
// }, {
//   urls: ['<all_urls>'],
// }, ['blocking', 'responseHeaders', 'extraHeaders']);


// chrome.webRequest.onBeforeSendHeaders.addListener(
//   (details) => forward.onBeforeSendHeadersCallback(details),
//   { urls: [ALL_URLS] },
//   [BLOCKING, REQUEST_HEADERS],
// );

window.pro_test = () => {
  console.log('this is the test');
};

window.ScenseService = ScenseService;

// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     debugger;

//     console.log(22);


//     return {};
//   },
//   { urls: ['<all_urls>'],
//   },
//   ['blocking'],
// );
