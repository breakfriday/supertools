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

  update_scense() {

  }

  add_scense(data) {
    this.addData(SCENSE_TABLE_NAME, data);
  }

  delete_scense() {

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
          list.push(cursor.value);
          cursor.continue();
        } else {
          resolve(list);
          console.log('没有更多数据了！');
        }
      };
    });
  }
}


export default new ScenseService();

