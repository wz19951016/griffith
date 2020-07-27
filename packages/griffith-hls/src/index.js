/*
 * @Author: wangzhong
 * @Date: 2020-07-24 18:09:17
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-07-27 14:27:37
 * @FilePath: /griffith/packages/griffith-hls/src/index.js
 */

import VideoComponent from './Video'

export default {
  pluginName: 'griffith-hls',
  VideoComponent,
  willHandleSrcChange: true,
}
// add log
