import constants from 'variables!./variables.scss'

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

export { getPath, isDropdElem, focusBoxStyles, listTimeout }
