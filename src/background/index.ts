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
