import forward from './foward-service';
import { ALL_URLS, BLOCKING, DISABLED, REQUEST_HEADERS, REQUEST_BODY } from './constant';
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
  [BLOCKING, REQUEST_BODY],
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
//   (details) => {
//     console.log('=======');
//   },
//   { urls: [ALL_URLS] },
//   [BLOCKING, REQUEST_HEADERS, 'requestBody'],
// );

// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     // 获取 POST 请求参数
//     if (details.method === 'POST') {
//       const postParams = details.requestBody.formData;
//       console.log(postParams);
//     }
//   },
//   { urls: [''] }, // 监听所有 URL
//   ['requestBody'], // 请求体中的参数
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
