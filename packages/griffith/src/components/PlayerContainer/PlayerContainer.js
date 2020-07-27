/*
 * @Author: wangzhong
 * @Date: 2020-07-24 16:22:20
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-07-27 15:34:23
 * @FilePath: /griffith/packages/griffith/src/components/PlayerContainer/PlayerContainer.js
 */

import React from 'react'
import PropTypes from 'prop-types'

import Player from '../Player'
import {
  VideoSourceProvider,
  VideoSourceContext,
} from '../../contexts/VideoSource'
import {MessageProvider, InternalContext} from '../../contexts/Message'
import {PositionProvider} from '../../contexts/Position'
import {ObjectFitProvider, VALID_FIT} from '../../contexts/ObjectFit'
import {LocaleContext} from '../../contexts/Locale'

const PlayerContainer = ({
  standalone,
  id,
  title,
  cover,
  duration,
  sources,
  error,
  onBeforePlay = () => Promise.resolve(),
  shouldObserveResize,
  children,
  initialObjectFit = 'contain',
  useMSE,
  locale = 'en',
  autoplay,
  useCustomControl,
  showFullScreen,
  showVloume,
  showQuality,
  showTimeText,
  showPLayPauseBtn,
  timelineStyle,
  timelineWrapStyle,
}) => (
  <ObjectFitProvider initialObjectFit={initialObjectFit}>
    <PositionProvider shouldObserveResize={shouldObserveResize}>
      <MessageProvider id={id} enableCrossWindow={standalone}>
        <InternalContext.Consumer>
          {({emitEvent, subscribeAction}) => (
            <VideoSourceProvider onEvent={emitEvent} sources={sources} id={id}>
              <LocaleContext.Provider value={locale}>
                <VideoSourceContext.Consumer>
                  {({currentSrc}) => (
                    <Player
                      useMSE={useMSE}
                      autoplay={autoplay}
                      standalone={standalone}
                      cover={cover}
                      title={title}
                      duration={duration}
                      error={error}
                      onEvent={emitEvent}
                      subscribeAction={subscribeAction}
                      onBeforePlay={() => onBeforePlay(currentSrc)}
                      useCustomControl={useCustomControl}
                      showFullScreen={showFullScreen}
                      showVloume={showVloume}
                      showQuality={showQuality}
                      showTimeText={showTimeText}
                      showPLayPauseBtn={showPLayPauseBtn}
                      timelineStyle={timelineStyle}
                      timelineWrapStyle={timelineWrapStyle}
                    />
                  )}
                </VideoSourceContext.Consumer>
                {children}
              </LocaleContext.Provider>
            </VideoSourceProvider>
          )}
        </InternalContext.Consumer>
      </MessageProvider>
    </PositionProvider>
  </ObjectFitProvider>
)

PlayerContainer.propTypes = {
  standalone: PropTypes.bool,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  cover: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  sources: PropTypes.objectOf(
    PropTypes.shape({
      bitrate: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      format: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      play_url: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  onBeforePlay: PropTypes.func,
  initialObjectFit: PropTypes.oneOf(VALID_FIT),
  useMSE: PropTypes.bool,
  useCustomControl: PropTypes.bool,
  showFullScreen: PropTypes.bool,
  showVloume: PropTypes.bool,
  showQuality: PropTypes.bool,
  showTimeText: PropTypes.bool,
  showPLayPauseBtn: PropTypes.bool,
  timelineStyle: PropTypes.object,
  timelineWrapStyle: PropTypes.object,
}

export default PlayerContainer
