import {
  getPath,
  CLASSNAMES,
  isDropdElem,
  listTimeout,
  focusBoxStyles,
} from '../helpers'
import React from 'react'
import '../helpers/styles.scss'
import PropTypes from 'prop-types'

class Dropd extends React.PureComponent {
  listRef = React.createRef()
  dropdRef = React.createRef()

  state = {
    open: false,
    defaultOpen: this.props.defaultOpen,
    currentItem: this.props.value
      ? this.props.value.label || this.props.value
      : null,
  }

  componentDidMount() {
    if (this.props.defaultOpen) {
      this.emitOpen(null)
      this.setState({ open: true })
    }

    document.addEventListener('mousedown', this.closeOnBlurFn, true)
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        currentItem: this.props.value.label || this.props.value,
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeOnBlurFn, true)
  }

  isDropdElem = ctx => isDropdElem(ctx, this.dropdRef.current)

  emit = (eventName, detail, callback) => {
    const event = new CustomEvent(eventName, { detail })

    this.dropdRef.current.dispatchEvent(event)
    typeof callback === 'function' && callback.call(this, detail)
  }

  emitOpen = event => {
    const onOpenIsValid =
      'onOpen' in this.props && typeof this.props.onOpen === 'function'

    if (onOpenIsValid) {
      this.emit('open', this.props.list, detail => {
        this.props.onOpen(detail, event)
      })
    }
  }

  resetListScroll = () => {
    setTimeout(() => {
      if (this.listRef && this.listRef.current)
        this.listRef.current.scrollTop = 0
    }, listTimeout)
  }

  closeOnBlurFn = event => {
    if (this.props.closeOnBlur && !this.isDropdElem(getPath(event))) {
      this.resetListScroll()
      this.setState({ defaultOpen: false })

      if (this.state.open) this.closeDropd()
    }
  }

  handleFocus = event => {
    if (!this.state.open) {
      this.setState({ open: true }, () => {
        this.emitOpen(event)
      })
    }
  }

  handleBlurOnTabNavigation = () => this.props.closeOnBlur && this.closeDropd()

  closeDropd = () => {
    this.resetListScroll()
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
        this.emit('itemChange', this.state.currentItem, detail => {
          this.props.onItemChange(detail, event)
        })
      }
    })
  }

  toggleDropd = event => {
    event.persist()
    event.stopPropagation()

    this.resetListScroll()
    this.setState(
      ({ open }) => ({ open: !open }),
      () => this.state.open && this.emitOpen(event)
    )
  }

  render() {
    const { currentItem, open } = this.state

    /* eslint-disable no-unused-vars */
    const {
      list,
      value,
      onOpen,
      revealOn,
      closeOnBlur,
      placeholder,
      defaultOpen,
      onItemChange,
      ...props
    } = this.props
    /* eslint-enable */

    return (
      <div
        {...props}
        dir="auto"
        data-open={open}
        ref={this.dropdRef}
        className={CLASSNAMES.container + ' react-dropd'}
      >
        <button
          type="button"
          tabIndex="-1"
          className={CLASSNAMES.button}
          onMouseDown={event => this.toggleDropd(event)}
        >
          <input
            type="search"
            autoComplete="off"
            readOnly="readonly"
            style={focusBoxStyles}
            className={CLASSNAMES.focusbox}
            onBlur={this.handleBlurOnTabNavigation}
            onFocus={event => this.handleFocus(event)}
          />

          {!currentItem && placeholder && (
            <span
              className={CLASSNAMES.currentItem + ' ' + CLASSNAMES.placeholder}
            >
              {placeholder.label || placeholder}
            </span>
          )}

          {currentItem && (
            <span className={CLASSNAMES.currentItem}>
              {currentItem.label || currentItem}
            </span>
          )}

          <span className={CLASSNAMES.caret} aria-hidden={true}>
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
          className={CLASSNAMES.list + (open ? ' open' : '')}
        >
          {list &&
            list.map((item, key) => (
              <li
                key={key}
                tabIndex="-1"
                className={CLASSNAMES.item}
                onMouseDown={event => this.handleItemChange(item, event)}
              >
                <a tabIndex="-1" className={CLASSNAMES.link}>
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
}

Dropd.defaultProps = {
  list: [],
  closeOnBlur: true,
  defaultOpen: false,
  value: null,
  placeholder: 'Please select an item',
}

export default Dropd
