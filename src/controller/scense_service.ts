import { SCENSE_TABLE_NAME } from '@/background/constant';
import db_service from './db_service';

class ScenseService extends db_service {
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
}


export default new ScenseService();

