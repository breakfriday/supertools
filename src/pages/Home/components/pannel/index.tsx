import React from 'react';
import { Tab } from '@alifd/next';

import ServicePannel from '../service_pannel';
import ModulePannel from '../module_pannel';
import AssetsPannel from '../assets_pannel';

function Pannel() {
  return (
    <div>
      <Tab>
        <Tab.Item title="服务接口代理" key="1" >
          <ServicePannel />
        </Tab.Item>
        <Tab.Item title="前端资源配置" key="2" >
          <AssetsPannel />
        </Tab.Item>
        <Tab.Item title="模块组件代理" key="3" >
          <ModulePannel />
        </Tab.Item>
      </Tab>
    </div>
  );
}

export default Pannel;
