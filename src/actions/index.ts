

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
    return background_page.ScenseService.add_scense(data);
    // dbService.addData(SCENSE_TABLE_NAME, data);
  },

  get_scence_list: () => {
    return background_page.ScenseService.get_all_scense();
  },
  update_scence: (parm: {id: string|number; data: {}}) => {
    return background_page.ScenseService.update_scense(parm);
  },
  update_rule: (parm: {id: string|number; data: {}}) => {
    return background_page.ScenseService.update_rule(parm);
  },
  add_rules_data: (parm: {rule_item: RuleItemInterface; scense_id: number}) => {
    const { rule_item, scense_id } = parm;
    rule_item.scense_id = scense_id;

    return background_page.ScenseService.add_rules(rule_item);
  },

  get_all_rules_list: () => {
    return background_page.ScenseService.get_all_rules_list();
  },

  delete_rule: (parm) => {
    const { id } = parm;
    return background_page.ScenseService.delet_rule(id);
  },


};


export { invoke_service };
