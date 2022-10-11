import { SCENSE_TABLE_NAME } from '@/background/constant';
import db_service from './db_service';

class ScenseService extends db_service {
  constructor() {
    super();
    this.create_db('local_db');
  }

  create_scense() {
    this.create_db('local_db');
  }

  update_scense(parm) {
    const { id, data } = parm;
    return this.updateData_by_read(SCENSE_TABLE_NAME, id, data);
  }

  add_scense(data) {
    return this.addData(SCENSE_TABLE_NAME, data);
  }

  delete_scense(key) {
    return this.delete_data(SCENSE_TABLE_NAME, key);
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
}


export default new ScenseService();

