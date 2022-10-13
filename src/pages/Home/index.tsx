
import { POPUP_HTML_PATH } from '@/config/constants';
import styles from './index.module.scss';
import Pannel from './components/pannel';
import react, { useEffect, useState, useRef } from 'react';
import { Button, Box, Dialog, Form, Input, Checkbox, Field, Menu, Icon } from '@alifd/next';
import { invoke_service } from '@/actions';
import fp_get from 'lodash/fp/get';
import fp_map from 'lodash/fp/map';
import { string } from 'prop-types';
import { promise_field_validate } from '@/utils/index';

import pageStore from '@/pages/Home/store';

const { SubMenu, Item } = Menu;


const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
  wrapperCol: {
    span: 14,
  },
};


const Home = () => {
  const [show_scense_dialog_state, set_show_scense_dialog_state] = useState(false);
  const [scense_list_state, set_scense_list_state] = useState([]);
  const scense_form_field = Field.useField();
  const edit_scense_form_field = Field.useField();
  const [show_edit_scense_dialog_state, set_show_edit_scense_dialog_state] = useState({ show: false, data: {} });

  const [pageState, pageDispatchers] = pageStore.useModel('model');


  const add_scense = async () => {
    let form_data: any = {};
    try {
      form_data = await promise_field_validate(scense_form_field);
    } catch (e) {
      console.log(e);
      return false;
    }

    invoke_service.add_scence(form_data).then((res) => {
      if (res.success === true) {
        async_get_scense();
      }
      set_show_scense_dialog_state(false);
    });
  };


  const async_get_scense = async () => {
    let res = {};
    try {
      res = await invoke_service.get_scence_list();
      if (res.sucess === true) {
        set_scense_list_state(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const async_update_scense = async (item) => {
    const { id } = item;
    const record = item;
    const new_status = String(record.status) === '1' ? '0' : '1';
    const new_data = fp_map((it) => {
      if (it.id == id) {
        it.status = new_status;
      }
      return it;
    })(scense_list_state);
    try {
      const res = await invoke_service.update_scence({ id, data: { status: new_status } });
    } catch (e) {
      console.log(e);
    }
    set_scense_list_state(new_data);
  };

  const async_update_scense_data = async () => {
    let form_data: any = {};

    try {
      form_data = await promise_field_validate(edit_scense_form_field);
    } catch (e) {
      console.log(e);
      return false;
    }

    const id = fp_get('data.id')(show_edit_scense_dialog_state);


    try {
      const res = await invoke_service.update_scence({ id, data: form_data });
      async_get_scense();
      set_show_edit_scense_dialog_state({ show: false, data: {} });
    } catch (e) {
      console.log(e);
    }
  };

  const async_delete_scense = async (id) => {
    try {
      const res = await invoke_service.delete_scense({ id });
      async_get_scense();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async_get_scense();
  }, []);
  return (
    <div className={styles['grid_wrapper']} >
      <div className={styles['menu_box']}>
        <div className={styles['add_box']}>
          <Button
            type="primary"
            className={styles['button1']}
            onClick={() => {
              invoke_service.pri_test({});
              invoke_service.open_db();
              set_show_scense_dialog_state(true);
            }}
          >添加场景
          </Button>
        </div>

        <div>


          <Menu
            defaultOpenKeys="1"
            className={styles['my-menu']}
            onItemClick={(key, record) => {
              // const hh = pageState;
              // debugger;
              // pageDispatchers.set_select_scense({ ...record });
            }}


          >

            {
            (() => {
              return fp_map((item) => {
                return (
                  <Menu.Item
                    key={item.id}
                    className={styles['menu_item']}
                    onClick={() => {
                      pageDispatchers.set_select_scense({ ...item });
                      pageDispatchers.get_rules_by_scense({ scense_id: item.id });
                    }}

                  >
                    <div className={styles['row_item']}>

                      <Checkbox
                        checked={item.status === '1'}
                        id={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          // const { id } = item;
                          // const record = item;
                          // const new_status = String(record.status) === '1' ? '0' : '1';
                          // const new_data = fp_map((it) => {
                          //   if (it.id == id) {
                          //     it.status = new_status;
                          //   }
                          //   return it;
                          // })(scense_list_state);
                          // set_scense_list_state(new_data);

                          async_update_scense(item);

                        // alert(JSON.stringify(item));
                        }}
                      />
                      <span className={styles['name_text']}>
                        {item.name}

                      </span>
                      <Icon
                        type="ashbin"
                        size={'small'}
                        onClick={() => {
                          const { id } = item;
                          async_delete_scense(id);
                        }}
                      />
                      <Icon
                        type="set"
                        size={'small'}
                        onClick={() => {
                          set_show_edit_scense_dialog_state({ show: true, data: item });
                        }}
                      />

                    </div>
                  </Menu.Item>);
              })(scense_list_state);
            })()
          }


          </Menu>,
        </div>

      </div>
      <div>
        <Pannel />
      </div>

      <Dialog
        visible={show_scense_dialog_state}
        width={'500px'}
        title="添加场景"
        v2
        onCancel={() => {
          set_show_scense_dialog_state(false);
        }}
        onClose={() => {
          set_show_scense_dialog_state(false);
        }}
        onOk={() => {
          // set_show_scense_dialog_state(false);
          // const data = scense_form_field.getValues();
          // invoke_service.add_scence(data).then((res) => {
          //   if (res.success === true) {
          //     async_get_scense();
          //   }
          // });

          add_scense();
        }}
      >
        <Form {...formItemLayout} colon field={scense_form_field}>
          <FormItem
            name="name"
            label="场景名"
            required

          >
            <Input
              placeholder="场景名"
              {...scense_form_field.init('name', {
                rules: [{ required: true }],
              })}
            />
          </FormItem>
          <FormItem
            name="remark"
            label="场景备注"

          >
            <Input.TextArea
              placeholder="场景备注"
              {...scense_form_field.init('remark', {

              })}
            />
          </FormItem>


        </Form>
      </Dialog>

      <Dialog
        visible={fp_get('show')(show_edit_scense_dialog_state)}
        width={'500px'}
        title="编辑场景"
        v2
        onCancel={() => {
          set_show_edit_scense_dialog_state({ show: false, data: {} });
        }}
        onClose={() => {
          set_show_edit_scense_dialog_state({ show: false, data: {} });
        }}
        onOk={() => {
          async_update_scense_data();
        }}
      >
        <Form {...formItemLayout} colon field={edit_scense_form_field}>
          <FormItem
            name="name"
            label="场景名"
            required
            {...edit_scense_form_field.init('name', {
              initValue: fp_get('data.name')(show_edit_scense_dialog_state),
              rules: [{ required: true }],
            })}

          >
            <Input />
          </FormItem>
          <FormItem
            name="remark"
            label="场景备注"
            {...edit_scense_form_field.init('remark', {
              initValue: fp_get('data.remark')(show_edit_scense_dialog_state),

            })}

          >
            <Input.TextArea placeholder="remark" />
          </FormItem>


        </Form>
      </Dialog>

    </div>);
};

export default Home;
