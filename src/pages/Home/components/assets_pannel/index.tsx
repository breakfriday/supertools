import react, { useEffect, useState } from 'react';
import { Table, Button, Box, Dialog, Form, Input, Checkbox, Select, Field } from '@alifd/next';
import styles from './index.module.scss';
import EmptyBlock from '@/components/EmptyBlcok';
import { invoke_service } from '@/actions';


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

  const get_module_list = async () => {
    try {
      const res = await invoke_service.get_all_rules_list();
      const data = res?.data;
      set_module_list_state(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    get_module_list();
  }, []);


  const add_item = async () => {
    const promise_validate = () => {
      return new Promise((resolve, reject) => {
        field_form.validate((error, values) => {
          if (error) {
            reject(error);
          } else {
            resolve(values);
          }
        });
      });
    };

    let form_data: any = {};
    try {
      form_data = await promise_validate();
    } catch (e) {
      console.log(e);
      return false;
    }

    try {
      const res = await invoke_service.add_rules_data({ rule_item: form_data, scense_id: 1 });
      get_module_list();
      set_api_rule_dialog_state(false);
    } catch (e) {
      console.log(e);
    }


    // const old_data = Object.assign([], module_list_state);
    // old_data.push(form_data);
    // set_module_list_state(old_data);
    // set_api_rule_dialog_state(false);
    // field_form.validate((error, values) => {
    //   const old_data = Object.assign([], module_list_state);
    //   old_data.push(values);

    //   debugger;
    //   set_module_list_state(old_data);
    //   set_api_rule_dialog_state(false);
    // });
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
        rowSelection={{
          getProps: (record) => {
            return { };
          },
        }}
        emptyContent={<EmptyBlock />}
      >
        <Table.Column title="前端资源" dataIndex="proxy_rule" />
        <Table.Column title="本地服务" dataIndex="proxy_target" />
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
            label="前端资源"
            required

          >
            <Input
              name="proxy_rule"
              placeholder=" "
              {...field_form.init('proxy_rule', {

                rules: [{ required: true }],
              })}
            />
          </FormItem>
          <FormItem
            label="替换内容"
            required
          >
            <Input
              name="proxy_target"
              placeholder="https://localhost/${name}/js/index.js"
              {...field_form.init('proxy_target', {
                rules: [{ required: true }],

              })}
            />
          </FormItem>

        </Form>
      </Dialog>
    </div>
  );
}

export default AssetsPannel;
