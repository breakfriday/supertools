

import ScenseService_pop_devtool_time from '@/controller/scense_service';

let background_page: BackgoundInterface = {};

try {
  background_page = chrome.extension.getBackgroundPage();
} catch (e) {
  console.log('非插件环境');
  background_page.ScenseService = ScenseService_pop_devtool_time; // 只是本地调试用， 数据库操作应该在后台线程 中运行
}

const invoke_service = {
  pri_test: (parm) => {
    // eslint-disable-next-line max-len
    try {
      background_page.pro_test();
    } catch (e) {
      console.error(e);
    }
  },

  open_db: () => {
    background_page.ScenseService.create_scense();
  },

  add_scence: (data) => {
    background_page.ScenseService.add_scense(data);
    // dbService.addData(SCENSE_TABLE_NAME, data);
  },

  get_scence_list: () => {
    background_page.ScenseService.get_all_scense();
  },


};


export { invoke_service };
