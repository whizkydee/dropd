import constants from 'variables!./variables.scss'

const CLASSNAMES = {
  container: 'dropd',
  list: 'dropd-list',
  item: 'dropd-item',
  link: 'dropd-link',
  caret: 'dropd-caret',
  button: 'dropd-toggle',
  focusbox: 'dropd-focusbox',
  currentItem: 'dropd-current',
  placeholder: 'is-placeholder',
}

const CLASSES = {}

Object.keys(CLASSNAMES).forEach(className => {
  CLASSES[className] = '.' + CLASSNAMES[className]
}) // { container: '.dropd', ... }

const getPath = event =>
  event && event instanceof UIEvent
    ? event.path || (event.composedPath && event.composedPath())
    : undefined

const isDropdElem = (ctx, ref) =>
  ctx && (ctx.indexOf(ref) !== -1 && ctx !== ref)

const focusBoxStyles = {
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  border: '0 none',
  outline: '0 none',
  textAlign: 'unset',
  position: 'absolute',
  WebkitAppearance: 'none',
}

const listTimeout =
  parseInt(constants.listTransitionDelay) +
  parseInt(constants.listTransitionDuration)

export {
  getPath,
  CLASSES,
  CLASSNAMES,
  isDropdElem,
  listTimeout,
  focusBoxStyles,
}
