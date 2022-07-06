import React from 'react';
import { Tab } from '@alifd/next';

import ServicePannel from '../service_pannel';

function Pannel() {
  return (
    <div>
      <Tab>
        <Tab.Item title="http服务代理 配置" key="1" >
          <ServicePannel />
        </Tab.Item>
        <Tab.Item title="资源代理 配置" key="2" />
        <Tab.Item title="模块代理 配置" key="3" />
      </Tab>
    </div>
  );
}

export default Pannel;
