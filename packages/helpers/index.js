import constants from 'variables!./constants.scss'

const CLASSNAMES = {
  container: 'dropd',
  list: 'dropd-list',
  item: 'dropd-item',
  caret: 'dropd-caret',
  button: 'dropd-toggle',
  focusbox: 'dropd-focusbox',
  highlighted: 'highlighted',
  currentItem: 'dropd-current',
  placeholder: 'is-placeholder',
}

const CLASSES = Object.keys(CLASSNAMES).reduce(
  (acc, cur) => ({ ...acc, [cur]: '.' + CLASSNAMES[cur] }),
  {}
) // { container: '.dropd', ... }

const getPath = event =>
  event && event instanceof UIEvent
    ? event.path || (event.composedPath && event.composedPath())
    : undefined

const isDropdElem = (ctx, ref) =>
  ctx && (ctx.indexOf(ref) !== -1 && ctx !== ref)

const listTransitionDelay = parseInt(constants.listTransitionDelay)

const listTimeout =
  listTransitionDelay + parseInt(constants.listTransitionDuration)

export {
  getPath,
  CLASSES,
  CLASSNAMES,
  isDropdElem,
  listTimeout,
  listTransitionDelay,
}
