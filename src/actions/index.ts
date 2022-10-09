
let background_service: BackgoundInterface = {};

try {
  background_service = chrome.extension.getBackgroundPage();
} catch (e) {
  console.log('非插件环境');
}

const invoke_service = {
  pri_test: (parm) => {
    // eslint-disable-next-line max-len
    try {
      background_service.pro_test();
    } catch (e) {
      console.error(e);
    }
  },

};


export { invoke_service };
