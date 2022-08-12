import react, { useEffect, useState } from 'react';
import { Table, Button, Box, Dialog, Form, Input, Checkbox, Select } from '@alifd/next';
import styles from './index.module.scss';
import EmptyBlock from '@/components/EmptyBlcok';


const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
  wrapperCol: {
    span: 14,
  },
};

function ServicePannel() {
  const [show_api_rule_dialog_state, set_api_rule_dialog_state] = useState(false);
  return (
    <div className={styles.box_pannel}>
      <div className={styles['button_title']} >
        <Button
          type="primary"
          onClick={() => {
            set_api_rule_dialog_state(true);
          }}
        >添加
        </Button>
      </div>

      <Table
        dataSource={[]}
        hasBorder={false}
        className={styles['table_box']}
        emptyContent={<EmptyBlock />}
      >
        <Table.Column title="接口" dataIndex="id" />
        <Table.Column title="类型" dataIndex="time" />
        <Table.Column title="操作" dataIndex="time" />
      </Table>


      <Dialog
        visible={show_api_rule_dialog_state}
        width={'500px'}
        title="添加mock"
        v2
        onCancel={() => {
          set_api_rule_dialog_state(false);
        }}
        onClose={() => {
          set_api_rule_dialog_state(false);
        }}
      >
        <Form {...formItemLayout} colon>
          <FormItem
            name="api"
            label="http Api"
            required

          >
            <Input />
          </FormItem>
          <FormItem
            name="api_alias_name"
            label="接口别名"


          >
            <Input />
          </FormItem>

          <FormItem label="mock类型">
            <Select>
              <Select.Option value="test">本地mock</Select.Option>
              <Select.Option value="test3">代理mock（yapi）</Select.Option>
            </Select>
          </FormItem>


          <FormItem
            name="api_alias_name"
            label="mock 地址"

          >
            <Input />
          </FormItem>

        </Form>
      </Dialog>
    </div>
  );
}

export default ServicePannel;
