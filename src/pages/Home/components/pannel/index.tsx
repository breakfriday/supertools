import React from 'react';
import { Tab } from '@alifd/next';

import ServicePannel from '../service_pannel';
import ModulePannel from '../module_pannel';
import AssetsPannel from '../assets_pannel';

function Pannel() {
  return (
    <div>
      <Tab>
        <Tab.Item title="HTTP接口MOCK" key="2" >
          <ServicePannel />
        </Tab.Item>
        <Tab.Item title="ASSETS资源代理" key="3" >
          <AssetsPannel />
        </Tab.Item>
        <Tab.Item title="HTTP接口代理" key="1" >
          <ServicePannel />
        </Tab.Item>
        <Tab.Item title="模块组件代理" key="4" >
          <ModulePannel />
        </Tab.Item>
        <Tab.Item title="资源注入" key="5" >
          <ModulePannel />
        </Tab.Item>
        <Tab.Item title="COOKIE注入" key="6" >
          <ModulePannel />
        </Tab.Item>
      </Tab>
    </div>
  );
}

export default Pannel;
