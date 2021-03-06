# ngx-amap [![npm version](https://badge.fury.io/js/ngx-amap.svg)](http://badge.fury.io/js/ngx-amap) [![npm downloads](https://img.shields.io/npm/dm/ngx-amap.svg)](https://npmjs.org/ngx-amap)
angular 2+ component for AMap (高德地图). Please refer to the [ngx-amap/demo](https://xieziyu.github.io/#/ngx-amap/demo) page.

This project is ongoing ...

## Table of contents 
1. [Installation](#installation)
2. [Usage](#usage)
3. [Config](#config)
4. [Directives](#directives)
5. [Types](#types)
6. [Demo](#demo)

# Installation
```
npm install ngx-amap --save
```

# Usage
1. import `NgxAmapModule` in your app module (or any other proper angular module).
    + app.module:
      ```typescript
      import { NgxAmapModule } from 'ngx-amap';

      @NgModule({
        imports: [
          ...,
          NgxAmapModule.forRoot({
            apiKey: '你申请的key'
          })
        ],
        ...
      })
      export class AppModule { }
      ```

2. use `ngx-amap` component with **pre-defined height**.
    + Simple example:

      + html:
      ```html
      <ngx-amap class="demo-map"></ngx-amap>
      ```

      + css:
      ```css
      .demo-map {
        height: 400px;
      }
      ```

3. use `amap-marker` to draw markers inside the map
    + Simple example:

      + html:
      ```html
      <ngx-amap class="demo-map" [center]="[116.397428, 39.90923]">
        <amap-marker [position]="[116.397428, 39.90923]" (markerClick)="onMarkerClick($event)"></amap-marker>
      </ngx-amap>
      ```

# Config
You can setup `NgxAmapModule` by `forRoot` method. It supports following options:
```typescript
{
  apiKey: string;   // *required*. Your developer key for AMap web service.
  apiVersion: string;  // [optional]. default is '1.3'
  urlPath: string;  // [optional]. default is 'http://webapi.amap.com/maps', You can change HTTP or HTTPS protocol by this string.
}
```

# Directives
+ `ngx-amap`: [**ngx-amap.md**](https://github.com/xieziyu/ngx-amap/blob/master/docs/ngx-amap.md)
+ `amap-marker`: [**amap-marker.md**](https://github.com/xieziyu/ngx-amap/blob/master/docs/amap-marker.md)

# Types
Exported some useful type interfaces such as `Icon`, `Pixel`, etc. Please refer to [**Types.md**](https://github.com/xieziyu/ngx-amap/blob/master/docs/Types.md).

# Demo
1. clone this repo to your working copy
2. modify `demo/src/app/app.module.ts` to use your own KEY for ngx-amap
3. launch the demo page in your local machine:
```
npm install
npm run demo
```