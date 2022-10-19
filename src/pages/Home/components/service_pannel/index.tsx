import react, { useEffect, useState } from 'react';
import { Table, Button, Box, Dialog, Form, Input, Checkbox, Select, Field } from '@alifd/next';
import styles from './index.module.scss';
import EmptyBlock from '@/components/EmptyBlcok';
import { invoke_service } from '@/actions';
import fp_filter from 'lodash/fp/filter';
import fp_get from 'lodash/fp/get';
import pageStore from '@/pages/Home/store';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function AssetsPannel() {
  const [show_api_rule_dialog_state, set_api_rule_dialog_state] = useState(false);

  const [module_list_state, set_module_list_state] = useState([]);
  const [select_rows_state, set_select_rows_state] = useState([]);

  const [show_edit_rule_dialog_state, set_show_edit_rule_dialog_state] = useState({ show: false, data: {} });

  const [pageState, pageDispatchers] = pageStore.useModel('model');


  const field_form = Field.useField([]);

  const edit_field_form = Field.useField([]);

  const select_scense_id = fp_get('select_scense.id')(pageState);

  const select_proxy_type = fp_get('select_proxy_type')(pageState);

  const get_module_list = async () => {
    try {
      const data = pageState.rules_list;
      const select_items = fp_filter((item) => {
        return item.status === 1;
      })(data);
      const select_keys = select_items.map((item) => { return item.id; });

      set_select_rows_state(select_keys);


      set_select_rows_state(select_keys);
      set_module_list_state(data);
    } catch (e) {
      console.error(e);
    }
  };

  const async_update_rule = async (selected, record) => {
    try {
      const status = selected === true ? 1 : 0;
      // record.status = status;
      const data = Object.assign({ ...record }, { status });

      const res = await invoke_service.update_rule({ id: record.id, data });
      // get_module_list();
      pageDispatchers.get_rules_by_scense({ scense_id: select_scense_id, select_proxy_type });
    } catch (e) {
      console.log(e);
    }
  };


  const async_update_rule_data = async () => {
    let form_data: any = {};
    const promise_validate = () => {
      return new Promise((resolve, reject) => {
        edit_field_form.validate((error, values) => {
          if (error) {
            reject(error);
          } else {
            resolve(values);
          }
        });
      });
    };

    try {
      form_data = await promise_validate();
    } catch (e) {
      console.log(e);
      return false;
    }

    const id = fp_get('data.id')(show_edit_rule_dialog_state);
    const data = Object.assign({}, { select_proxy_type }, form_data);
    try {
      const res = await invoke_service.update_rule({ id, data });
      pageDispatchers.get_rules_by_scense({ scense_id: select_scense_id });
      set_show_edit_rule_dialog_state({ show: false, data: {} });
    } catch (e) {
      console.log(e);
    }
  };

  const async_delete_rule = async (parm) => {
    try {
      const res = await invoke_service.delete_rule(parm);
      pageDispatchers.get_rules_by_scense({ scense_id: select_scense_id, select_proxy_type });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    get_module_list();
  }, [pageState.rules_list]);


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

    const data = Object.assign({}, { select_proxy_type }, form_data);
    try {
      const res = await invoke_service.add_rules_data({ rule_item: data, scense_id: select_scense_id });
      pageDispatchers.get_rules_by_scense({ scense_id: select_scense_id, select_proxy_type });
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
          onSelect(selected, record, records) {
            async_update_rule(selected, record);
          },
          selectedRowKeys: select_rows_state,
          getProps: (record) => {
            return { };
          },
        }}
        emptyContent={<EmptyBlock />}
      >
        <Table.Column
          title="前端资源"
          dataIndex="proxy_rule"
          cell={(value, index, record) => {
            return (
              <div>
                <span className={styles['alias_style']}>[ {fp_get('alias_name')(record)} ]</span>
                <span>{value}</span>
              </div>
            );
          }}
        />
        <Table.Column title="本地服务" dataIndex="proxy_target" />
        <Table.Column
          title="操作"
          cell={(value, index, record) => {
            return (
              <div className={styles['operator_row']}>
                <Button
                  className={styles['operator_button']}
                  type="secondary"
                  onClick={() => {
                    set_show_edit_rule_dialog_state({ show: true, data: record });
                  }}

                >编辑
                </Button>
                <Button
                  className={styles['operator_button']}
                  type="secondary"
                  onClick={() => {
                    async_delete_rule({ id: record.id });
                  }}
                >删除
                </Button>
              </div>
            );
          }}
        />
      </Table>


      <Dialog
        visible={show_api_rule_dialog_state}
        width={'580px'}
        title="新增"
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
          <FormItem
            label="别名"
          >
            <Input
              name="alias_name"
              placeholder="别名"
              {...field_form.init('alias_name', {

              })}
            />
          </FormItem>

        </Form>
      </Dialog>


      <Dialog
        visible={show_edit_rule_dialog_state.show}
        width={'580px'}
        title="编辑"
        v2
        onCancel={() => {
          set_show_edit_rule_dialog_state({ show: false, data: {} });
        }}
        onClose={() => {
          set_show_edit_rule_dialog_state({ show: false, data: {} });
        }}
        onOk={(parm) => {
          async_update_rule_data();
          // add_item();
        }}
      >
        <Form field={edit_field_form} {...formItemLayout} colon>
          <FormItem
            label="前端资源"
            required

          >
            <Input
              name="proxy_rule"
              placeholder=" "
              {...edit_field_form.init('proxy_rule', {
                initValue: fp_get('data.proxy_rule')(show_edit_rule_dialog_state),

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
              {...edit_field_form.init('proxy_target', {
                initValue: fp_get('data.proxy_target')(show_edit_rule_dialog_state),
                rules: [{ required: true }],

              })}
            />
          </FormItem>
          <FormItem
            label="别名"
          >
            <Input
              name="alias_name"
              placeholder="别名"
              {...edit_field_form.init('alias_name', {
                initValue: fp_get('data.alias_name')(show_edit_rule_dialog_state),

              })}
            />
          </FormItem>

        </Form>
      </Dialog>
    </div>
  );
}

export default AssetsPannel;
