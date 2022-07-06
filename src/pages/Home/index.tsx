
import { POPUP_HTML_PATH } from '@/config/constants';
import styles from './index.module.scss';
import Pannel from './components/pannel';

import { Button, Box } from '@alifd/next';


const Home = () => {
  return (
    <div className={styles['grid_wrapper']} >
      <div className={styles['menu_box']}>
        <div className={styles['add_box']}>
          <Button type="primary" className={styles['button1']}>添加场景</Button>
        </div>

      </div>
      <div>
        <Pannel />
      </div>

    </div>);
};

export default Home;
