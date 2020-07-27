/*
 * @Author: wangzhong
 * @Date: 2020-07-24 16:22:19
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-07-27 15:33:39
 * @FilePath: /griffith/example/mp4/App.js
 */

import React from 'react'
import {hot} from 'react-hot-loader'
import PlayerContainer, {MessageContext} from '../../packages/griffith'
import LayerTest from './LayerTest'

const duration = 182

const sources = {
  hd: {
    bitrate: 2005,
    size: 46723282,
    duration,
    format: 'mp4',
    width: 1280,
    height: 720,
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
  },
  sd: {
    bitrate: 900.49,
    size: 20633151,
    duration,
    format: 'mp4',
    width: 320,
    height: 240,
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
  },
}

const props = {
  id: 'zhihu2018',
  standalone: true,
  title: '2018 我们如何与世界相处？',
  cover: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018.jpg',
  duration,
  sources,
  shouldObserveResize: true,
  src: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
  useCustomControl: true,
  showFullScreen: false,
  showVloume: false,
  showQuality: false,
  showTimeText: false,
  showPLayPauseBtn: false,
  timelineWrapStyle: {
    position: 'fixed',
    width: '100%',
    height: '5px',
    left: 0,
    top: 100,
    zIndex: 9999,
    padding: 0,
  },
  timelineStyle: {
    padding: 0,
  },
}

const App = () => (
  <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
    <PlayerContainer {...props}>
      <MessageContext.Consumer>
        {({subscribeEvent}) => <LayerTest subscribeEvent={subscribeEvent} />}
      </MessageContext.Consumer>
    </PlayerContainer>
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100px',
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        zIndex: 9999,
      }}
    />
  </div>
)

export default hot(module)(App)
