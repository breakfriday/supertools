
import { POPUP_HTML_PATH } from '@/config/constants';

export function openLink(url: string, isInner = false): void {
  chrome.tabs.create(
    { url: isInner ? chrome.extension.getURL(url) : url },
    (tab) => {
      // Tab opened.
    },
  );
}

const Home = () => {
  return (<div onClick={() => {
    openLink(POPUP_HTML_PATH, true);
  }}
  >this is the test
  </div>);
};

export default Home;
