import React from 'react';
import { Table, Button } from '@alifd/next';
import styles from './index.module.scss';

function ServicePannel() {
  return (
    <div className={styles.box_pannel}>
      <div >
        <Button >添加</Button>
      </div>

      <Table dataSource={[]} hasBorder={false} className={styles['table_box']} tableLayout="auto">
        <Table.Column title="接口" dataIndex="id" />
        <Table.Column title="类型" dataIndex="time" />
        <Table.Column title="操作" dataIndex="time" />
      </Table>
    </div>
  );
}

export default ServicePannel;
