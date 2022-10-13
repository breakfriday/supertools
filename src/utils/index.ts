export function openLink(url: string, isInner = false): void {
  chrome.tabs.create(
    { url: isInner ? chrome.extension.getURL(url) : url },
    (tab) => {
      // Tab opened.
    },
  );
}


export function promise_field_validate(form_field) {
  return new Promise((resolve, reject) => {
    form_field.validate((error, values) => {
      if (error) {
        reject(error);
      } else {
        resolve(values);
      }
    });
  });
}
