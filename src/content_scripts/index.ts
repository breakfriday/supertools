function addJs() {
  const file = chrome.extension.getURL('js/inject/drag.js');
  console.log(file);
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = file;
  document.documentElement.appendChild(s);
}
