import React, { useEffect, useState } from 'react';
import { Tab } from '@alifd/next';
import fp_get from 'lodash/fp/get';

import ServicePannel from '../service_pannel';
import ModulePannel from '../module_pannel';
import AssetsPannel from '../assets_pannel';
import pageStore from '@/pages/Home/store';
import { proxy_types } from '@/background/constant';

function Pannel() {
  const [pageState, pageDispatchers] = pageStore.useModel('model');
  const select_proxy_type = fp_get('select_proxy_type')(pageState);
  const select_scense_id = fp_get('select_scense.id')(pageState);

  useEffect(() => {
    pageDispatchers.set_proxy_type(proxy_types.assets_proxy);
  }, []);
  return (
    <div>
      <Tab>
        <Tab.Item
          title="ASSETS资源代理"
          key="3"
          onClick={() => {
            pageDispatchers.set_proxy_type(proxy_types.assets_proxy);


            pageDispatchers.get_rules_by_scense({ scense_id: select_scense_id, select_proxy_type: proxy_types.assets_proxy });
          }}
        >
          <AssetsPannel />
        </Tab.Item>
        <Tab.Item
          title="HTTP接口MOCK"
          key="2"
          onClick={() => {
            pageDispatchers.set_proxy_type(proxy_types.https_mock);

            pageDispatchers.get_rules_by_scense({ scense_id: select_scense_id, select_proxy_type: proxy_types.https_mock });
          }}
        >
          <ServicePannel />
        </Tab.Item>
        <Tab.Item
          title="HTTP接口代理"
          key="1"
          onClick={() => {
            pageDispatchers.set_proxy_type(proxy_types.http_proxy);
            pageDispatchers.get_rules_by_scense({ scense_id: select_scense_id, select_proxy_type: proxy_types.http_proxy });
          }}
        >
          <ServicePannel />
        </Tab.Item>
        {/* <Tab.Item title="模块组件代理" key="4" >
          <ModulePannel />
        </Tab.Item> */}
        <Tab.Item
          title="资源注入"
          key="5"
          onClick={() => {
            pageDispatchers.set_proxy_type(proxy_types.assets_inject);
          }}
        >
          <ModulePannel />
        </Tab.Item>
        <Tab.Item
          title="COOKIE注入"
          key="6"
          onClick={() => {
            pageDispatchers.set_proxy_type(proxy_types.cookie_set);
          }}
        >
          <ModulePannel />
        </Tab.Item>
      </Tab>
    </div>
  );
}

export default Pannel;
