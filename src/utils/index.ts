export function openLink(url: string, isInner = false): void {
  chrome.tabs.create(
    { url: isInner ? chrome.extension.getURL(url) : url },
    (tab) => {
      // Tab opened.
    },
  );
}
