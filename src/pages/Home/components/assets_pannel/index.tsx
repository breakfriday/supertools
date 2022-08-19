import react, { useEffect, useState } from 'react';
import { Table, Button, Box, Dialog, Form, Input, Checkbox, Select, Field } from '@alifd/next';
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

function AssetsPannel() {
  const [show_api_rule_dialog_state, set_api_rule_dialog_state] = useState(false);

  const [module_list_state, set_module_list_state] = useState([]);

  const field_form = Field.useField([]);


  const add_item = () => {
    field_form.validate((error, values) => {
      const old_data = Object.assign([], module_list_state);
      old_data.push(values);
      set_module_list_state(old_data);
      set_api_rule_dialog_state(false);
    });
  };

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
        dataSource={module_list_state}
        hasBorder={false}
        className={styles['table_box']}
        emptyContent={<EmptyBlock />}
      >
        <Table.Column title="模块名称" dataIndex="module_name" />
        <Table.Column title="本地服务" dataIndex="proxy_url" />
        <Table.Column title="操作" dataIndex="time" />
      </Table>


      <Dialog
        visible={show_api_rule_dialog_state}
        width={'500px'}
        title="模块代理"
        v2
        onCancel={() => {
          set_api_rule_dialog_state(false);
        }}
        onClose={() => {
          set_api_rule_dialog_state(false);
        }}
        onOk={(parm) => {
          add_item();
        }}
      >
        <Form field={field_form} {...formItemLayout} colon>
          <FormItem
            label="模块名称"
            required

          >
            <Input
              name="module_name"
              placeholder="模块名"
              {...field_form.init('module_name', {

              })}
            />
          </FormItem>
          <FormItem
            label="本地服务"
          >
            <Input
              name="proxy_url"
              placeholder="https://localhost/${modulename}"
              {...field_form.init('proxy_url', {

              })}
            />
          </FormItem>

        </Form>
      </Dialog>
    </div>
  );
}

export default AssetsPannel;
