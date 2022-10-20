import { SCENSE_TABLE_NAME, RULES_TABLE_NAME } from '@/background/constant';
import db_service from './db_service';
import fp_to_pairs from 'lodash/fp/toPairs';
import fp_map from 'lodash/fp/map';
import fp_fliter from 'lodash/fp/filter';

class ScenseService extends db_service {
  constructor() {
    super();
    this.create_db('local_db').then(() => {
      this.get_effect_rules();
    });
  }

  create_scense() {
    this.create_db('local_db');
  }

  create_rules() {
    this.create_db('local_db');
  }

  add_rules(data: RuleItemInterface) {
    return this.addData(RULES_TABLE_NAME, data);
  }

  async create_rules_store() {
    const store = this.create_store(RULES_TABLE_NAME);
    return '';
  }

  // 获取规则列表
  async get_rules_by_scense() {
    const objectStore = await this._getObjectStore(RULES_TABLE_NAME);
    const list = [];


    return new Promise((resolve, reject) => {
      resolve({});
    });
  }

  update_scense(parm) {
    const { id, data } = parm;
    return this.updateData_by_read(SCENSE_TABLE_NAME, id, data);
  }

  update_rule(parm) {
    const { id, data } = parm;
    return this.updateData_by_read(RULES_TABLE_NAME, id, data);
  }

  add_scense(data) {
    return this.addData(SCENSE_TABLE_NAME, data);
  }

  delete_scense(key) {
    return this.delete_data(SCENSE_TABLE_NAME, key);
  }
  delet_rule(id) {
    return this.delete_data(RULES_TABLE_NAME, id);
  }
  async get_all_scense() {
    const { db } = this;

    // const objectStore = db.transaction([SCENSE_TABLE_NAME]).objectStore(SCENSE_TABLE_NAME); // 事
    const objectStore = await this._getObjectStore(SCENSE_TABLE_NAME);
    const list = [];

    return new Promise((resolve, reject) => {
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const temp_item = { ...cursor.value, id: cursor.key };
          list.push(temp_item);
          cursor.continue();
        } else {
          resolve({
            sucess: true,
            data: list,
          });
          console.log('没有更多数据了！');
        }
      };
    });
  }

  async get_all_rules_list() {
    const objectStore = await this._getObjectStore(RULES_TABLE_NAME);
    const list = [];

    return new Promise((resolve, reject) => {
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const temp_item = { ...cursor.value };
          list.push(temp_item);
          cursor.continue();
        } else {
          resolve({
            sucess: true,
            data: list,
          });
          console.log('没有更多数据了！');
        }
      };
    });
  }

  async get_all_rules_list_by_key(parm) {
    const objectStore = await this._getObjectStore(RULES_TABLE_NAME);
    const pairs_key = fp_to_pairs(parm);
    const list = [];

    const where_key = (data) => {
      let reg = true;
      fp_map((it) => {
        const key = it[0];
        const value = it[1];

        if (data[key] != value) {
          reg = false;
        }
      })(pairs_key);
      return reg;
    };

    return new Promise((resolve, reject) => {
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const temp_item = { ...cursor.value };
          const reg = where_key(temp_item);
          if (reg === true) {
            list.push(temp_item);
          }
          cursor.continue();
        } else {
          resolve({
            sucess: true,
            data: list,
          });
          console.log('没有更多数据了！');
        }
      };
    });
  }

  async get_all_scense_list_by_key(parm) {
    const objectStore = await this._getObjectStore(SCENSE_TABLE_NAME);
    const pairs_key = fp_to_pairs(parm);
    const list = [];

    const where_key = (data) => {
      let reg = true;
      fp_map((it) => {
        const key = it[0];
        const value = it[1];

        if (data[key] != value) {
          reg = false;
        }
      })(pairs_key);
      return reg;
    };

    return new Promise((resolve, reject) => {
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const temp_item = { ...cursor.value };
          const reg = where_key(temp_item);
          if (reg === true) {
            list.push(temp_item);
          }
          cursor.continue();
        } else {
          resolve({
            sucess: true,
            data: list,
          });
          console.log('没有更多数据了！');
        }
      };
    });
  }

  async get_effect_rules() {
    let effect_rules: any = {};
    let effect_scense: any = {};
    let effect_scense_ids: any = [];
    try {
      effect_rules = await this.get_all_rules_list_by_key({ status: 1 });
    } catch (e) {
      console.error(e);
    }

    try {
      effect_scense = await this.get_all_scense_list_by_key({ status: 1 });
      effect_scense_ids = fp_map((it) => { return it.id; })(effect_scense.data || []);
    } catch (e) {
      console.error(e);
    }

    const effect_data = fp_fliter((it) => {
      const { scense_id } = it;
      if (effect_scense_ids.indexOf(scense_id) >= 0) {
        return it;
      } else {
        return false;
      }
    })(effect_rules.data || []);

    const effect_data_array = fp_map((it) => {
      return [it.proxy_rule, it];
    })(effect_data);
    const effect_data_map = new Map(effect_data_array);


    window._forward.config = {
      proxy: effect_data_map,
    };

    return { effect_data_map };
  }
}


export default new ScenseService();

