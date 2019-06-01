import {
  getPath,
  CLASSNAMES,
  isDropdElem,
  listTimeout,
  listTransitionDelay,
} from '../helpers'
import React from 'react'
import '../helpers/styles.scss'
import PropTypes from 'prop-types'

class Dropd extends React.PureComponent {
  listRef = React.createRef()
  dropdRef = React.createRef()

  state = {
    open: false,
    highlighted: 0,
    defaultOpen: this.props.defaultOpen,
  }

  constructor(props) {
    super(props)
    this.state.currentItem = this.props.value ? this.getLabel() : null
  }

  componentDidMount() {
    if (this.props.defaultOpen) {
      this.emitOpen(null)
      this.setState({ open: true })
    }

    if (this.props.value && this.props.list instanceof Array) {
      let label = this.getLabel() || this.getLabel().map(({ label }) => label)
      this.highlight(this.props.list.indexOf(label))
    }

    if (document && document.addEventListener) {
      document.addEventListener('mousedown', this.closeOnBlurFn, true)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value && this.props.value !== prevProps.value) {
      this.setState({ currentItem: this.value })
    }
  }

  componentWillUnmount() {
    if (document && document.removeEventListener) {
      document.removeEventListener('mousedown', this.closeOnBlurFn, true)
    }
  }

  isDropdElem = ctx => isDropdElem(ctx, this.dropdRef.current)

  getLabel = (ctx = this.props) => ctx.value || ctx.value.label

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

  scrollTo = pos =>
    this.listRef.current ? (this.listRef.current.scrollTop = pos) : null

  resetListScroll = () => {
    setTimeout(() => {
      if (this.listRef && this.listRef.current)
        this.listRef.current.scrollTop = 0
    }, listTimeout)
  }

  closeOnBlurFn = event => {
    if (this.props.closeOnBlur && !this.isDropdElem(getPath(event))) {
      this.props.alwaysResetScroll && this.resetListScroll()
      this.setState({ defaultOpen: false })

      if (this.state.open) this.closeDropd()
    }
  }

  highlight = idx => this.setState({ highlighted: idx })

  handleBlur = () => this.props.closeOnBlur && this.closeDropd()

  closeDropd = () => {
    this.props.alwaysResetScroll && this.resetListScroll()
    this.setState({ open: false, defaultOpen: false })
  }

  handleKeyDown = event => {
    switch (event.key) {
      case ' ': // Space
        this.toggleDropd(event)
        break
      case 'Escape':
        if (this.state.open) this.closeDropd()
        break
      case 'ArrowUp':
        event.preventDefault()
        break
      case 'ArrowDown':
        event.preventDefault()
        break

      default:
        break
    }
  }

  toggleDropd = event => {
    const RIGHT_CLICK = event.button === 2
    event.persist()
    event.stopPropagation()

    this.props.alwaysResetScroll && this.resetListScroll()

    if (!RIGHT_CLICK) {
      this.setState(
        ({ open }) => ({ open: !open }),
        () => this.state.open && this.emitOpen(event)
      )
    }
  }

  handleItemChange = (item, idx, event) => {
    event.preventDefault()
    event.nativeEvent && event.nativeEvent.stopImmediatePropagation()

    this.highlight(idx)
    setTimeout(() => this.closeDropd(), listTransitionDelay)
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

  render() {
    const { currentItem, open, highlighted } = this.state

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
      alwaysResetScroll,
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
          onBlur={this.handleBlur}
          className={CLASSNAMES.button}
          onKeyDown={this.handleKeyDown}
          onMouseDown={event => this.toggleDropd(event)}
        >
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
              focusable="false"
              viewBox="0 0 6 4"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  id="a"
                  d="M132.047 389.564l.644-.537a.134.134 0 0 1 .091-.028.124.124 0 0 1 .085.042l2.134 2.438 2.133-2.438a.124.124 0 0 1 .085-.042.137.137 0 0 1 .091.028l.645.537c.025.021.04.05.043.083a.115.115 0 0 1-.03.088l-2.872 3.223a.127.127 0 0 1-.19 0l-2.873-3.223a.116.116 0 0 1-.03-.088.12.12 0 0 1 .044-.083z"
                />
              </defs>
              <use
                opacity=".7"
                fill="#2c3c4f"
                xlinkHref="#a"
                transform="translate(-132 -389)"
              />
            </svg>
          </span>
        </button>

        <ul
          role="listbox"
          ref={this.listRef}
          aria-hidden={String(!open)}
          className={CLASSNAMES.list + (open ? ' open' : '')}
        >
          {list &&
            list.map((item, key) => (
              <li
                key={key}
                role="option"
                className={
                  CLASSNAMES.item +
                  (key === highlighted ? ' ' + CLASSNAMES.highlighted : '')
                }
                onMouseDown={event => event.preventDefault()}
                onMouseUp={event => this.handleItemChange(item, key, event)}
              >
                {item.label || item}
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
  alwaysResetScroll: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Dropd.defaultProps = {
  list: [],
  closeOnBlur: true,
  defaultOpen: false,
  alwaysResetScroll: false,
  value: null,
  placeholder: 'Select...',
}

export default Dropd
