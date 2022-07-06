import React from 'react';
import { Table } from '@alifd/next';

function ServicePannel() {
  return (
    <div>
      <Table dataSource={[]} hasBorder={false}>
        <Table.Column title="接口" dataIndex="id" />
        <Table.Column title="类型" dataIndex="time" />
        <Table.Column title="操作" dataIndex="time" />
      </Table>
    </div>
  );
}

export default ServicePannel;
