// 创建库
function openDB(dbName, version = 1) {
  return new Promise((resolve, reject) => {
    //  兼容浏览器
    const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
    let db;
    // 打开数据库，若没有则会创建
    const request = indexedDB.open(dbName, version);
    // 数据库打开成功回调
    request.onsuccess = function (event) {
      db = event.target.result; // 数据库对象
      console.log('数据库打开成功');
      resolve(db);
    };
    // 数据库打开失败的回调
    request.onerror = function (event) {
      console.log('数据库打开报错');
    };
    // 数据库有更新时候的回调
    request.onupgradeneeded = function (event) {
      // 数据库创建或升级的时候会触发
      console.log('onupgradeneeded');
      db = event.target.result; // 数据库对象
      let objectStore;
      // 创建存储库
      objectStore = db.createObjectStore('signalChat', {
        keyPath: 'sequenceId', // 这是主键
        // autoIncrement: true // 实现自增
      });
      // 创建索引，在后面查询数据的时候可以根据索引查
      objectStore.createIndex('link', 'link', { unique: false });
      objectStore.createIndex('sequenceId', 'sequenceId', { unique: false });
      objectStore.createIndex('messageType', 'messageType', {
        unique: false,
      });
    };
  });
}


// 插入数据

function addData(db, storeName, data) {
  const request = db
    .transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) // 仓库对象
    .add(data);

  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  request.onerror = function (event) {
    console.log('数据写入失败');
  };
}


export { addData, openDB };
