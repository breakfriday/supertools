
// 正则配置
export const REGEXP_LIST = {
  TRIM_JSON: /(,+)([^a-z0-9["])/gi,
  CHROME_EXTENSION: /^chrome-extension:\/\//i,
  // support [ ] ( ) \ * ^ $
  FORWARD: /\\|\[|]|\(|\)|\*|\$|\^/i,
  WHITESPACE: /\s+/g,
  X_HEADER: /^x-/,
};

export const ALL_URLS = '<all_urls>';

export const BLOCKING = 'blocking';
export const REQUEST_HEADERS = 'requestHeaders';

export const DISABLED = 'disabled';

export const MILLISECONDS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

export const SCENSE_TABLE_NAME = 'scense_table_store'; // 场景表名称

export const RULES_TABLE_NAME = 'rules_table_store'; // 场景表名称

export const proxy_types = {
  assets_proxy: 1,
  https_mock: 2,
  http_proxy: 3,
  module_proxy: 4,
  assets_inject: 5,
  cookie_set: 5,
};


export const CORS = {
  METHODS: 'access-control-allow-methods',
  CREDENTIALS: 'access-control-allow-credentials',
  ORIGIN: 'access-control-allow-origin',
  HEADERS: 'access-control-allow-headers',
};

export const ACCESS_CONTROL_REQUEST_HEADERS = 'access-control-request-headers';
export const DEFAULT_CORS_ORIGIN = '*';
export const DEFAULT_CORS_METHODS = '*';
export const DEFAULT_CORS_CREDENTIALS = 'true';
export const ORIGIN = 'origin';