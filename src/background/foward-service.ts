

import { REGEXP_LIST } from './constant';

import { Base64, encode, decode } from 'js-base64';

// import atob from 'atob';

export enum UrlType {
  REG = 'reg',
  STRING = 'string',
}


const matchUrl = (url: string, reg: string): string | boolean => {
  if (REGEXP_LIST.FORWARD.test(reg)) {
    // support ??
    const r = new RegExp(reg.replace('??', '\\?\\?'), 'i');
    const matched = r.test(url);
    if (matched) {
      return UrlType.REG;
    }
  } else {
    const matched = url.indexOf(reg) > -1;
    if (matched) {
      return UrlType.STRING;
    }
  }
  return false;
};

// 转发服务
class ForwardService {
  private _urls: string[] = new Array(200); // for cache_rules
  private _lastRequestId: string | null = null;
  private _config: IFowardConfig = {};

  get urls(): string[] {
    return this._urls;
  }
  get config(): IFowardConfig {
    return this._config;
  }
  set config(newValue: IFowardConfig) {
    this._config = { ...newValue };
  }

  redirectToMatchingRule(
    details: chrome.webRequest.WebRequestHeadersDetails,
  ): chrome.webRequest.BlockingResponse {
    const rules = this.config.proxy;
    let redirectUrl: string = details.url;

    // in case of chrome-extension downtime
    if (!rules || !rules.size || REGEXP_LIST.CHROME_EXTENSION.test(redirectUrl)) {
      return {};
    }

    if (
      /http(s?):\/\/.*\.(js|css|json|jsonp)/.test(redirectUrl) &&
      this._urls.indexOf(redirectUrl) < 0
    ) {
      this._urls.shift();
      this._urls.push(redirectUrl);
    }


    for (const [rule, value] of rules) {
      if (typeof rule === 'string') {
        const matched = matchUrl(redirectUrl, rule);
        if (details.requestId !== this._lastRequestId) {
          if (matched === UrlType.REG) {
            const r = new RegExp(rule.replace('??', '\\?\\?'), 'i');

            const mock_default_data = { success: false,
              result: {
                data: ['后来'],
              },
              code: null,
              message: 'mock_data_none' };
            if (value.select_proxy_type === 2) {
              const { mock_data } = value;
              try {
                const base64Str = encode(JSON.stringify(JSON.parse(mock_data)));
                redirectUrl = `data:application/json;base64,${base64Str}`;
              } catch (e) {
                const base64Str = encode(JSON.stringify(mock_default_data));
                redirectUrl = `data:application/json;base64,${base64Str}`;
              }
            } else {
              redirectUrl = redirectUrl.replace(r, value.proxy_target);
            }

            // redirectUrl = redirectUrl.replace(r, value.proxy_target);
          } else if (matched === UrlType.STRING) {
            redirectUrl = redirectUrl.split(rule).join(value.proxy_target);
          }
        }
      }
    }


    this._lastRequestId = details.requestId;
    const data = redirectUrl === details.url ? {} : { redirectUrl };
    return data;
  }

  onBeforeRequestCallback(
    details: chrome.webRequest.WebRequestHeadersDetails,
  ): chrome.webRequest.BlockingResponse {
    return this.redirectToMatchingRule(details);
  }
}


if (!window._forward) {
  window._forward = new ForwardService();
}


window._forward.config = {
  proxy: new Map([
    [
      'https://dev.zcycdn.com/web-cs-robot-front/cs-robot/umi.(.*).js', // https://dev.zcycdn.com/web-cs-robot-front/cs-robot/umi.(.*).js
      'https://localhost:8000/cs-robot/umi.js', // http://127.0.0.1:3000/index.js
    ],
    [
      'https://dev.zcycdn.com/web-cs-robot-front/cs-robot/umi.(.*).css',
      'https://localhost:8000/cs-robot/umi.css', //
    ],
  ]),
};


export default window._forward;

