
let background_service = {};

try {
  background_service = chrome.extension.getBackgroundPage();
} catch (e) {
  console.log('非插件环境');
}

const invoke_service = {
  pri_test: (parm) => {
    // eslint-disable-next-line max-len
    background_service.pro_test();
  },

};


export { invoke_service };
