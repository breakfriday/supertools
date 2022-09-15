import forward from './foward-service';
import { ALL_URLS, BLOCKING, DISABLED, MILLISECONDS_PER_WEEK } from './constant';

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

