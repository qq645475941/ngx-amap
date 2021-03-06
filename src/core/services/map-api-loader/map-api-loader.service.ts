import { Inject, Injectable, InjectionToken } from '@angular/core';

import { DocumentRef, WindowRef } from '../../utils/browser-globals';

export interface IMapAPILoaderConfig {
  apiKey?: string;
  apiVersion?: string;
  urlPath?: string;
}

export const MAP_API_CONFIG = new InjectionToken<IMapAPILoaderConfig>('ngx-amap MAP_API_CONFIG');

@Injectable()
export class MapAPILoaderService {
  private _config: IMapAPILoaderConfig;
  private _documentRef: DocumentRef;
  private _windowRef: WindowRef;
  private _loadingPromise: Promise<void>;

  constructor(@Inject(MAP_API_CONFIG) config: any,
              d: DocumentRef,
              w: WindowRef) {
    this._config = config || {};
    this._windowRef = w;
    this._documentRef = d;
  }

  load() {
    if (this._loadingPromise) { return this._loadingPromise; }

    const script = this._documentRef.getNativeDocument().createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    const callbackName = `ngxAMapAPILoader`;
    script.src = this.getSrcFromConfig(callbackName);

    this._loadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>this._windowRef.getNativeWindow())[callbackName] = () => {
        resolve();
      };

      script.onerror = (error: Event) => { reject(error); };
    });

    this._documentRef.getNativeDocument().body.appendChild(script);
    return this._loadingPromise;
  }

  private getSrcFromConfig(callbackName: string) {
    const urlBase = this._config.urlPath || 'http://webapi.amap.com/maps';
    const queryParams: {[key: string]: string | Array<string>} = {
      v: this._config.apiVersion || '1.3',
      callback: callbackName,
      key: this._config.apiKey
    };
    const params = Object.keys(queryParams)
      .filter((k: string) => queryParams[k] != null)
      .filter((k: string) => {
        // remove empty arrays
        return !Array.isArray(queryParams[k]) ||
            (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
      })
      .map((k: string) => {
        // join arrays as comma seperated strings
        const i = queryParams[k];
        if (Array.isArray(i)) {
          return {key: k, value: i.join(',')};
        }
        return {key: k, value: queryParams[k]};
      })
      .map((entry: {key: string, value: string}) => `${entry.key}=${entry.value}`)
      .join('&');

    return `${urlBase}?${params}`;
  }
}
