class DbService {
  private request_db;
  private db: any= {};

  create_db(dbName, version = 1) {
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
    };

    request_db.onupgradeneeded = (event: any) => {
      console.log('onupgradeneeded  出发');

      this.db = event.target.result; // 数据库对象

      this.create_store('scense_table_store');
    };
  }


  create_store(store_name) {
    // const objectStore = this.db.createObjectStore(store_name, { keyPath: 'id' });
    if (!this.db.objectStoreNames.contains(store_name)) {
      const objectStore = this.db.createObjectStore(store_name, { autoIncrement: true });

      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('ids', 'ids', { unique: true });
    }
  }

  addData(storeName, data) {
    this.db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
      .objectStore(storeName) // 仓库对象
      .add(data);
  }
}


export default new DbService();
