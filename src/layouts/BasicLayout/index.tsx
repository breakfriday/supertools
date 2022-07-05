import React, { useState } from 'react';
import { Shell, ConfigProvider } from '@alifd/next';
import PageNav from './components/PageNav';
import styles from './index.module.scss';


(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}
export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getDevice: IGetDevice = (width) => {
    const isPhone =
      typeof navigator !== 'undefined' &&
      navigator &&
      navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [device, setDevice] = useState(getDevice(NaN));

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth =
        (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }

  return (
    <ConfigProvider device={device}>
      <div
        style={{
          minHeight: '100vh',
        }}
        className={styles['grid_wrapper']}

      >
        <div className={styles.head}>asdfasdf</div>
        <div>
          <PageNav />
        </div>

        <div>{children}</div>

      </div>
    </ConfigProvider>
  );
}
