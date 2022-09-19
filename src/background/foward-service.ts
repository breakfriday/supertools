

import { REGEXP_LIST } from './constant';

export enum UrlType {
  REG = 'reg',
  STRING = 'string',
}


const config_rules = {
  proxy: new Map([
    [
      'https://dev.zcycdn.com/web-cs-robot-front/cs-robot/umi.(.*).js', // https://www.sample.com/path1/path2/index.js
      'https://localhost:8000/cs-robot/umi.js', // http://127.0.0.1:3000/index.js
    ],
  ]),
};

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


    try {
      for (const [rule, value] of rules) {
        if (typeof rule === 'string') {
          const matched = matchUrl(redirectUrl, rule);
          if (details.requestId !== this._lastRequestId) {
            if (matched === UrlType.REG) {
              const r = new RegExp(rule.replace('??', '\\?\\?'), 'i');
              redirectUrl = redirectUrl.replace(r, value);
            } else if (matched === UrlType.STRING) {
              redirectUrl = redirectUrl.split(rule).join(value);
            }
          }
        }
      }
    } catch (e) {
      console.error('rule match error', e);
    }

    // try {
    //   for (let i = 0; i < rules.length; i++) {
    //     const rule = rules[i];
    //     if (rule && rule[0] && typeof rule[1] === 'string') {
    //       const reg = rule[0];
    //       const matched = matchUrl(redirectUrl, reg);

    //       if (details.requestId !== this._lastRequestId) {
    //         if (matched === UrlType.REG) {
    //           const r = new RegExp(reg.replace('??', '\\?\\?'), 'i');
    //           redirectUrl = redirectUrl.replace(r, rule[1]);
    //         } else if (matched === UrlType.STRING) {
    //           redirectUrl = redirectUrl.split(rule[0]).join(rule[1]);
    //         }
    //       }
    //     }
    //   }
    // } catch (e) {
    //   console.error('rule match error', e);
    // }

    this._lastRequestId = details.requestId;
    return redirectUrl === details.url ? {} : { redirectUrl };
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
  proxy: config_rules.proxy,
};


export default window._forward;

