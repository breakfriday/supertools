import { SCENSE_TABLE_NAME } from '@/background/constant';

class DbService {
  private request_db;
  //   private db: any= {};

  //   get _db() {
  //     return this.db;
  //   }
  //   set _db(db) {
  //     this.db = db;
  //   }

  constructor() {
    // this.db = {};
    console.log('----');
  }
  async _getTransaction(storeName) {
    let db;
    // 先从缓存获取
    if (this.db) {
      db = this.db;
    } else {
      db = await this.create_db('local_db');
    }
    return db.transaction([storeName], 'readwrite');
  }
  /**
   * 获取store
   */
  async _getObjectStore(storeName) {
    const transaction = await this._getTransaction(storeName);
    return transaction.objectStore(storeName);
  }

  async create_db(dbName, version = 1) {
    return new Promise((resolve, reject) => {
      // 打开数据库，若没有则会创建
      const request_db = indexedDB.open(dbName, version);
      this.request_db = request_db;

      // 数据库打开失败的回调
      request_db.onerror = function (event) {
        console.log('数据库打开报错');
      };


      request_db.onsuccess = (event: any) => {
        console.log('数据库连接成功');
        this.db = event.target.result; // 数据库对象
        resolve(this.db);
      };

      request_db.onupgradeneeded = (event: any) => {
        console.log('onupgradeneeded  出发');

        this.db = event.target.result; // 数据库对象

        this.create_store('scense_table_store');
        resolve(this.db);
      };
    });
  }


  create_store(store_name) {
    // const objectStore = this.db.createObjectStore(store_name, { keyPath: 'id' });
    if (!this.db.objectStoreNames.contains(store_name)) {
      const objectStore = this.db.createObjectStore(store_name, { autoIncrement: true });

      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('ids', 'ids', { unique: true });
    }
  }


  async addData(storeName, data) {
    const objectStore = await this._getObjectStore(SCENSE_TABLE_NAME);

    return new Promise((resolve, reject) => {
    //   const request = this.db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）

      const request = objectStore.add(data);

      request.onsuccess = function (event) {
        console.log('数据更新成功');
        resolve({
          success: true,
        });
      };

      request.onerror = function (event) {
        console.log('数据更新失败');
        resolve({
          success: false,
          message: '更新失败',
        });
      };
    });
  }

  async delete_data(storeName, data) {
    const objectStore = await this._getObjectStore(SCENSE_TABLE_NAME);

    return '';
  }
}


export default DbService;
