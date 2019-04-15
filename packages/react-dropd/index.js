import React from 'react'
import '../util/styles.scss'
import PropTypes from 'prop-types'
import { getPath, isDropdElem } from '../util'

class Dropd extends React.PureComponent {
  dropdRef = React.createRef()
  listRef = React.createRef()

  state = {
    list: [],
    open: false,
    currentItem: null,
    defaultOpen: false,
    revealOn: 'mousedown',
  }

  UNSAFE_componentWillMount() {
    const { list, value } = this.props

    this.setState(state => ({
      revealOn: this.props.revealOn,
      list: [...state.list, ...list],
      defaultOpen: this.props.defaultOpen,
      currentItem: value ? value.label || value : null,
    }))
  }

  componentDidMount() {
    if (this.props.defaultOpen) {
      this._emitOpen(null)
      this.setState({ open: true })
    }

    document.addEventListener('mousedown', this.closeOnBlurFn, true)
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.revealOn !== this.state.revealOn) {
      this.setState({
        revealOn: nextProps.revealOn,
      })
    } else if (nextProps.defaultOpen !== this.state.defaultOpen) {
      this.setState({
        defaultOpen: nextProps.defaultOpen,
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeOnBlurFn, true)
  }

  _isDropdElem = ctx => isDropdElem(ctx, this.dropdRef.current)

  _emit = (eventName, detail, callback) => {
    const event = new CustomEvent(eventName, { detail })

    this.dropdRef.current.dispatchEvent(event)
    if (typeof callback === 'function') callback.call(this, detail)
  }

  _emitOpen = event => {
    if ('onOpen' in this.props && typeof this.props.onOpen === 'function') {
      this._emit('open', this.props.list, detail => {
        this.props.onOpen(detail, event)
      })
    }
  }

  _resetListScroll = () => {
    setTimeout(() => {
      if (this.listRef && this.listRef.current)
        this.listRef.current.scrollTop = 0
    }, 250)
  }

  closeOnBlurFn = event => {
    if (this.props.closeOnBlur && !this._isDropdElem(getPath(event))) {
      this._resetListScroll()
      this.setState({ defaultOpen: false })

      if (this.state.open) this.closeDropd()
    }
  }

  handleFocus = event => {
    if (!this.state.open) {
      this.setState({ open: true }, () => {
        this._emitOpen(event)
      })
    }
  }

  closeDropd = () => {
    this._resetListScroll()
    this.setState({ open: false, defaultOpen: false })
  }

  handleItemChange = (item, event) => {
    event.preventDefault()
    event.nativeEvent && event.nativeEvent.stopImmediatePropagation()

    this.closeDropd()
    this.setState({ currentItem: item }, () => {
      if (
        'onItemChange' in this.props &&
        typeof this.props.onItemChange === 'function'
      ) {
        this._emit('itemChange', this.state.currentItem, detail => {
          this.props.onItemChange(detail, event)
        })
      }
    })
  }

  toggleDropd = event => {
    event.persist()
    event.stopPropagation()

    this._resetListScroll()
    this.setState(
      ({ open }) => ({ open: !open }),
      () => {
        if (this.state.open) this._emitOpen(event)
      }
    )
  }

  render() {
    const { placeholder } = this.props
    const { list, currentItem, open } = this.state

    /* eslint-disable no-unused-vars */
    const {
      value,
      onOpen,
      revealOn,
      closeOnBlur,
      defaultOpen,
      onItemChange,
      list: listProp,
      placeholder: placeholderProp,
      ...props
    } = this.props
    /* eslint-enable */

    return (
      <div
        {...props}
        dir="auto"
        data-open={open}
        ref={this.dropdRef}
        className="dropd react-dropd"
      >
        <button
          type="button"
          tabIndex="-1"
          className="dropd-toggle"
          onMouseDown={event => this.toggleDropd(event)}
        >
          <input
            type="search"
            autoComplete="off"
            readOnly="readonly"
            onBlur={this.closeDropd}
            style={{
              width: 0,
              height: 0,
              margin: 0,
              padding: 0,
              border: '0 none',
              outline: '0 none',
              textAlign: 'unset',
              position: 'absolute',
              WebkitAppearance: 'none',
            }}
            className="dropd-fake-search"
            onFocus={event => this.handleFocus(event)}
          />

          {!currentItem && placeholder && (
            <span className="dropd-current is-placeholder">
              {placeholder.label || placeholder}
            </span>
          )}

          {currentItem && (
            <span className="dropd-current">
              {currentItem.label || currentItem}
            </span>
          )}

          <span className="dropd-caret" aria-hidden={true}>
            <svg
              width="6"
              height="4"
              tabIndex="-1"
              viewBox="0 0 6 4"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  id="a"
                  tabIndex="-1"
                  d="M132.047 389.564l.644-.537a.134.134 0 0 1 .091-.028.124.124 0 0 1 .085.042l2.134 2.438 2.133-2.438a.124.124 0 0 1 .085-.042.137.137 0 0 1 .091.028l.645.537c.025.021.04.05.043.083a.115.115 0 0 1-.03.088l-2.872 3.223a.127.127 0 0 1-.19 0l-2.873-3.223a.116.116 0 0 1-.03-.088.12.12 0 0 1 .044-.083z"
                />
              </defs>
              <use
                opacity=".7"
                fill="#2c3c4f"
                xlinkHref="#a"
                tabIndex="-1"
                transform="translate(-132 -389)"
              />
            </svg>
          </span>
        </button>

        <ul
          ref={this.listRef}
          aria-hidden={String(!open)}
          className={'dropd-list' + (open ? ' open' : '')}
        >
          {list &&
            list.map((item, key) => (
              <li
                key={key}
                tabIndex="-1"
                className="dropd-item"
                onMouseDown={event => this.handleItemChange(item, event)}
              >
                <a tabIndex="-1" className="dropd-link">
                  {item.label || item}
                </a>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

Dropd.propTypes = {
  list: PropTypes.array,
  closeOnBlur: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onItemChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  revealOn: PropTypes.oneOf(['mousedown']),
}

Dropd.defaultProps = {
  list: [],
  closeOnBlur: true,
  defaultOpen: false,
  value: null,
  placeholder: 'Please select an item',
  revealOn: 'mousedown',
}

export default Dropd
