
import { POPUP_HTML_PATH } from '@/config/constants';
import styles from './index.module.scss';
import Pannel from './components/pannel';
import react, { useEffect, useState } from 'react';
import { Button, Box, Dialog, Form, Input, Checkbox } from '@alifd/next';
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


const Home = () => {
  const [show_scense_dialog_state, set_show_scense_dialog_state] = useState(false);
  return (
    <div className={styles['grid_wrapper']} >
      <div className={styles['menu_box']}>
        <div className={styles['add_box']}>
          <Button
            type="primary"
            className={styles['button1']}
            onClick={() => {
              invoke_service.pri_test({})
              set_show_scense_dialog_state(true);
            }}
          >添加场景
          </Button>
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
      >
        <Form {...formItemLayout} colon>
          <FormItem
            name="scence"
            label="场景名"
            required

          >
            <Input />
          </FormItem>
          <FormItem
            name="scence_remark"
            label="场景备注"

          >
            <Input.TextArea placeholder="场景描述" />
          </FormItem>


        </Form>
      </Dialog>

    </div>);
};

export default Home;
