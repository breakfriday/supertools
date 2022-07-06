
import { POPUP_HTML_PATH } from '@/config/constants';
import styles from './index.module.scss';
import Pannel from './components/pannel';

export function openLink(url: string, isInner = false): void {
  chrome.tabs.create(
    { url: isInner ? chrome.extension.getURL(url) : url },
    (tab) => {
      // Tab opened.
    },
  );
}


const Home = () => {
  return (
    <div className={styles['grid_wrapper']} >
      <div className={styles['menu_box']}>
        <div>场景</div>
      </div>
      <div>
        <Pannel />
      </div>

    </div>);
};

export default Home;
