
import { POPUP_HTML_PATH } from '@/config/constants';
import styles from './index.module.scss';
import Pannel from './components/pannel';
import react, { useEffect, useState, useRef } from 'react';
import { Button, Box, Dialog, Form, Input, Checkbox, Field } from '@alifd/next';
import { invoke_service } from '@/actions';
import fp_get from 'lodash/fp/get';
import fp_map from 'lodash/fp/map';

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
          {
            (() => {
              return fp_map((item) => {
                return <div>{item.name}</div>;
              })(scense_list_state);
            })()
          }
        </div>

      </div>
      <div>
        <Pannel />
      </div>

      <Dialog
        visible={show_scense_dialog_state}
        width={'500px'}
        title="场景"
        v2
        onCancel={() => {
          set_show_scense_dialog_state(false);
        }}
        onClose={() => {
          set_show_scense_dialog_state(false);
        }}
        onOk={() => {
          set_show_scense_dialog_state(false);
          const data = scense_form_field.getValues();
          invoke_service.add_scence(data);
        }}
      >
        <Form {...formItemLayout} colon field={scense_form_field}>
          <FormItem
            name="name"
            label="场景名"
            required

          >
            <Input />
          </FormItem>
          <FormItem
            name="remark"
            label="场景备注"

          >
            <Input.TextArea placeholder="场景描述" />
          </FormItem>


        </Form>
      </Dialog>

    </div>);
};

export default Home;
