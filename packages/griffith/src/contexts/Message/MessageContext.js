import React from 'react'
import PropTypes from 'prop-types'
import EventEmitter from 'eventemitter3'
import {createMessageHelper} from 'griffith-message-justcome'

const EVENT_TYPE = 'event'
const ACTION_TYPE = 'action'

/**
 * 用于播放器内部，只能接收外界传入的 Action，向外界发出 Event
 */
export const InternalContext = React.createContext({})
InternalContext.displayName = 'InternalMessageContext'

/**
 * 用于播放器外部，只能接收播放器发出的 Event, 或者向播放器发送 Action
 */
export const ExternalContext = React.createContext({})
ExternalContext.displayName = 'ExternalMessageContext'

export class MessageProvider extends React.PureComponent {
  static propsTypes = {
    id: PropTypes.string.isRequired,
    enableCrossWindow: PropTypes.bool,
    targetOrigin: PropTypes.string.isRequired,
  }

  static defaultProps = {
    targetOrigin: '*',
  }

  constructor(props) {
    super(props)
    this.emitter = new EventEmitter()
    const {id, targetOrigin} = this.props
    const {subscribeMessage, dispatchMessage} = createMessageHelper(
      id,
      targetOrigin
    )

    this.subscribeCrossWindowMessage = subscribeMessage
    this.dispatchCrossWindowMessage = dispatchMessage
  }

  componentDidMount() {
    if (this.props.enableCrossWindow) {
      this.crossWindowMessageSubscription = this.subscribeCrossWindowMessage(
        this.dispatchAction
      )
    }
  }

  componentWillUnmount() {
    if (this.crossWindowEventSubscription) {
      this.crossWindowEventSubscription.unsubscribe()
    }
  }

  emitEvent = (eventName, data) => {
    this.emitter.emit(eventName, {__type__: EVENT_TYPE, data})
    if (this.props.enableCrossWindow) {
      this.dispatchCrossWindowMessage(window.parent, eventName, data)
    }
  }

  subscribeEvent = (eventName, listener) => {
    const realLisener = ({__type__, data} = {}) => {
      if (__type__ === EVENT_TYPE) {
        listener(data)
      }
    }
    this.emitter.on(eventName, realLisener)

    return {
      unsubscribe: () => this.emitter.off(eventName, realLisener),
    }
  }

  dispatchAction = (actionName, data) => {
    this.emitter.emit(actionName, {__type__: ACTION_TYPE, data})
  }

  subscribeAction = (eventName, listener) => {
    const realLisener = ({__type__, data}) => {
      if (__type__ === ACTION_TYPE) {
        listener(data)
      }
    }
    this.emitter.on(eventName, realLisener)

    return {
      unsubscribe: () => this.emitter.off(eventName, realLisener),
    }
  }

  render() {
    return (
      <InternalContext.Provider
        value={{
          emitEvent: this.emitEvent,
          subscribeAction: this.subscribeAction,
        }}
      >
        <ExternalContext.Provider
          value={{
            dispatchAction: this.dispatchAction,
            subscribeEvent: this.subscribeEvent,
          }}
        >
          {this.props.children}
        </ExternalContext.Provider>
      </InternalContext.Provider>
    )
  }
}
