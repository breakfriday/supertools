
// 正则配置
const REGEXP_LIST = {
  TRIM_JSON: /(,+)([^a-z0-9["])/gi,
  CHROME_EXTENSION: /^chrome-extension:\/\//i,
  // support [ ] ( ) \ * ^ $
  FORWARD: /\\|\[|]|\(|\)|\*|\$|\^/i,
  WHITESPACE: /\s+/g,
  X_HEADER: /^x-/,
};

export const ALL_URLS = '<all_urls>';

export const BLOCKING = 'blocking';

export const DISABLED = 'disabled';

export const MILLISECONDS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

