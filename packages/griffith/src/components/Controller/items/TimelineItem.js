/*
 * @Author: wangzhong
 * @Date: 2020-07-24 18:09:18
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-07-27 15:09:11
 * @FilePath: /griffith/packages/griffith/src/components/Controller/items/TimelineItem.js
 */

import React from 'react'
import {css} from 'aphrodite/no-important'
import styles from '../styles'
import Timeline from '../../Timeline'

const TimelineItem = props => (
  <div className={css(styles.timeline)}>
    <Timeline {...props} />
  </div>
)

export default TimelineItem
