/*
 * @Author: wangzhong
 * @Date: 2020-07-24 18:09:17
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-07-27 14:37:36
 * @FilePath: /griffith/packages/griffith-mp4/src/index.js
 */

import VideoComponent from './player'

export default {
  pluginName: 'griffith-mp4-justcome',
  VideoComponent,
  willHandleSrcChange: true,
}
